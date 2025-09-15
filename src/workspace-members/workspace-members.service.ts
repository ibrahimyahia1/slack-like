import { Injectable } from '@nestjs/common';
import { CreateWorkspaceMemberDto } from './dto/create-workspace-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceMember } from './entities/workspace-member.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WorkspaceMembersService {

  constructor(@InjectRepository(WorkspaceMember)
  private readonly workspaceMemberRepository: Repository<WorkspaceMember>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) { }

  async create(createWorkspaceMemberDto: CreateWorkspaceMemberDto) {
    let role = await this.roleRepo.findOne({ where: { name: 'Member' } });

    if (!role) {
      role = this.roleRepo.create({ name: 'Member' });
      role = await this.roleRepo.save(role);
    }

    const wsMember = this.workspaceMemberRepository.create({
      workspace: { id: createWorkspaceMemberDto.workspace_id },
      user: { id: createWorkspaceMemberDto.user_id },
      role
    });
    await this.workspaceMemberRepository.save(wsMember);

    return await this.workspaceMemberRepository.save(wsMember);
  }

}
