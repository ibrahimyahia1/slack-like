import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { WorkspaceInvite } from './entities/workspace-invite.entity';
import { Repository } from 'typeorm';
import { InviteStatus } from 'src/enums/invite-status.enum';
import { generateInviteToken } from 'src/utils/generate-token.util';
import { AcceptInviteDto } from './dto/accept-invite.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class WorkspaceInviteService {
  constructor(
    @InjectRepository(WorkspaceInvite)
    private inviteRepo: Repository<WorkspaceInvite>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async sendInvite(inviterId: number, email: string): Promise<WorkspaceInvite> {
    const inviter = await this.userRepo.findOneBy({ id: inviterId });
    if (!inviter) throw new NotFoundException('Inviter not found');

    const existingUser = await this.userRepo.findOneBy({ email });
    if (existingUser) throw new BadRequestException('This user already exists');

    const pendingInvite = await this.inviteRepo.findOneBy({ email, status: InviteStatus.PENDING });
    if (pendingInvite && pendingInvite.expiresAt > new Date()) return pendingInvite;

    const token = generateInviteToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invite = this.inviteRepo.create({
      email,
      token,
      expiresAt,
      inviter,
      status: InviteStatus.PENDING
    });

    return this.inviteRepo.save(invite);
  }

  async acceptInvite(token: string, dto: AcceptInviteDto) {
    const invite = await this.inviteRepo.findOne({
      where: { token },
      relations: { inviter: true }
    });

    if (!invite) throw new BadRequestException('Invalid invite token');

    if (invite.status !== InviteStatus.PENDING) throw new BadRequestException('This invite has already used');

    if (invite.expiresAt < new Date()) {
      invite.status = InviteStatus.EXPIRED;
      await this.inviteRepo.save(invite);
      throw new BadRequestException('Invite has expired');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      email: invite.email,
      username: invite.email.split('@')[0],
      password: hashedPassword
    });

    await this.userRepo.save(user);

    invite.status = InviteStatus.ACCEPTED;
    await this.inviteRepo.save(invite);

    return user;
  }
}
