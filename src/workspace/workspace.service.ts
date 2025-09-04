import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { Repository } from 'typeorm';
import { WorkspaceMember } from 'src/workspace-members/entities/workspace-member.entity';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepo: Repository<Workspace>,
    @InjectRepository(WorkspaceMember)
    private memberRepo: Repository<WorkspaceMember>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) { }
  // async create(createWorkspaceDto: CreateWorkspaceDto , ) {
  //   // Step 1: Create the workspace
  //   const workspace = this.workspaceRepo.create({
  //     workspace_name: createWorkspaceDto.workspace_name,
  //     description: createWorkspaceDto.description,
  //     owner: createWorkspaceDto.owner
  //       ? { user_id: createWorkspaceDto.owner.user_id }
  //       : undefined,
  //   });

  //   const savedWorkspace = await this.workspaceRepo.save(workspace);

  //   // Step 2: Add members if provided
  //   if (createWorkspaceDto.members && createWorkspaceDto.members.length > 0) {
  //     const members = createWorkspaceDto.members.map(memberDto =>
  //       this.memberRepo.create({
  //         workspace_id: savedWorkspace.workspace_id,
  //         user_id: memberDto.user_id,
  //         ownerUserId: savedWorkspace.owner_user_id,
  //       }),
  //     );

  //     await this.memberRepo.save(members);
  //   }

  //   // Step 3: Return workspace with owner + members
  //   return this.getWorkspaceWithOwnerAndMembers(savedWorkspace.workspace_id);
  // }



  async getWorkspaceWithOwnerAndMembers(workspaceId: number): Promise<Workspace> {
    const workspace = await this.workspaceRepo.findOne({
      where: { id: workspaceId },
      relations: {
        members: {
          user: true,
          role: true
        },
      },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${workspaceId} not found`);
    }

    return workspace;
  }

  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto): Promise<Workspace> {
    const updatedWorkspace = await this.workspaceRepo.findOneBy({ id })
    if (!updatedWorkspace) {
      throw new NotFoundException('Workspace not found!')
    }
    Object.assign(updatedWorkspace, updateWorkspaceDto);
    return this.workspaceRepo.save(updatedWorkspace)
  }
}
