import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkspaceMemberDto } from './dto/create-workspace-member.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { WorkspaceMember } from './entities/workspace-member.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class WorkspaceMembersService {

  constructor(@InjectRepository(WorkspaceMember)
  private readonly workspaceMemberRepository: Repository<WorkspaceMember>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Workspace)
    private readonly workspaceRepo: Repository<Workspace>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  async create(dto: CreateWorkspaceMemberDto) {
    const workspace = await this.workspaceRepo.findOne({
      where: { id: dto.workspace_id },
      relations: ["owner"],
    });
    if (!workspace) throw new NotFoundException("Workspace not found");

    const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
    if (!user) throw new NotFoundException("User not found");

    if (workspace.owner && workspace.owner.id === dto.user_id) {
      throw new BadRequestException("Owner is already a member as 'Owner'");
    }

    let role = await this.roleRepo.findOne({ where: { name: dto.roleName || "Member" } });
    if (!role) {
      role = this.roleRepo.create({ name: dto.roleName || "Member" });
      await this.roleRepo.save(role);
    }

    const member = this.workspaceMemberRepository.create({ workspace, user, role });

    try {
      return await this.workspaceMemberRepository.save(member);
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestException("User is already a member of this workspace");
      }
      throw error;
    }
  }

  getAll() {
    return this.workspaceMemberRepository.find()
  }

}
