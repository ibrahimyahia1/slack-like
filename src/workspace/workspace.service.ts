import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { Repository, DataSource } from 'typeorm';
import { WorkspaceMember } from 'src/workspace-members/entities/workspace-member.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepo: Repository<Workspace>,
    @InjectRepository(WorkspaceMember)
    private memberRepo: Repository<WorkspaceMember>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) { }
  async createWorkspace(dto: CreateWorkspaceDto, ownerId: number) {
    return this.dataSource.transaction(async (manager) => {
     
      const owner = await manager.findOne(User, { where: { id: ownerId } });
      if (!owner) throw new Error('Owner not found');

     
      const workspace = manager.create(Workspace, {
        name: dto.name,
        description: dto.description,
        owner: owner,
        members:[]
      });
      await manager.save(workspace);

      
      let ownerRole = await manager.findOne(Role, { where: { name: 'Owner' } });
      if (!ownerRole) {
        ownerRole = manager.create(Role, { name: 'Owner' });
        await manager.save(ownerRole);
      }

      
      const member = manager.create(WorkspaceMember, {
       // workspace: { id: workspace.id },
        user: {id : owner.id},
        role: ownerRole,
      });
      await manager.save(member);
      workspace.members.push(member)

      return workspace
    });
  }




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
      throw new NotFoundException("this workspace not found");
    }

    return workspace;
  }


  async getAllWithMembers() {
    const workspace = await this.workspaceRepo.find({
      relations: {
        members: {
          user: true,
          role: true
        },
      },
    });
    return workspace;
  }


  async deleteMember(workspaceId: number,memberId: number, currentUserId: number) {
    const workspace = await this.workspaceRepo.findOne({
      where: { id: workspaceId },
      relations: {
        owner: true
      }
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    if (workspace.owner.id !== currentUserId) {
      throw new ForbiddenException('Only the workspace owner can remove members');
    }

    const member = await this.memberRepo.findOne({
      where: { id: memberId, workspace: { id: workspaceId } },
    });

    if (!member) {
      throw new NotFoundException('Member not found in workspace');
    }

    return this.memberRepo.remove(member);
  
  }

  // async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto): Promise<Workspace> {
  //   const updatedWorkspace = await this.workspaceRepo.findOneBy({ id })
  //   if (!updatedWorkspace) {
  //     throw new NotFoundException('Workspace not found!')
  //   }
  //   Object.assign(updatedWorkspace, updateWorkspaceDto);
  //   return this.workspaceRepo.save(updatedWorkspace)
  // }
}
