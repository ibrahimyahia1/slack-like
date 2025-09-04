import { Injectable } from '@nestjs/common';
import { CreateWorkspaceMemberDto } from './dto/create-workspace-member.dto';
import { UpdateWorkspaceMemberDto } from './dto/update-workspace-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceMember } from './entities/workspace-member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspaceMembersService {
  
  constructor(@InjectRepository(WorkspaceMember)
  private readonly workspaceMemberRepository: Repository<WorkspaceMember>,) { }
  
  create(createWorkspaceMemberDto: CreateWorkspaceMemberDto) {
    const wsMembers = this.workspaceMemberRepository.create(createWorkspaceMemberDto)
    return this.workspaceMemberRepository.save(wsMembers);
  }

  findAll() {
    return `This action returns all workspaceMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workspaceMember`;
  }

  update(id: number, updateWorkspaceMemberDto: UpdateWorkspaceMemberDto) {
    return `This action updates a #${id} workspaceMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspaceMember`;
  }
}
