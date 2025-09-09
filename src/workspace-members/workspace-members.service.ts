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
  private readonly workspaceMemberRepository: Repository<WorkspaceMember>,) { }
  
async create(createWorkspaceMemberDto: CreateWorkspaceMemberDto) {
  const wsMembers = this.workspaceMemberRepository.create({
    workspace: { id: createWorkspaceMemberDto.workspace_id } as Workspace,
    user: { id: createWorkspaceMemberDto.user_id } as User,
    role: createWorkspaceMemberDto.role_id ? ({ id: createWorkspaceMemberDto.role_id } as Role) : undefined,
  });
    return await this.workspaceMemberRepository.save(wsMembers);
  }

}
