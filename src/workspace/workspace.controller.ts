import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Req() req: any,) {
    const ownerId = req.user.id;
    return this.workspaceService.createWorkspace(createWorkspaceDto, ownerId)
  }


  @Get(':id')
  async getWorkspace(@Param('id') workspaceId: number) {
    return this.workspaceService.getWorkspaceWithOwnerAndMembers(workspaceId);
  }

  @Get()
  async getAllWorkspaceWithMembers() {
    return this.workspaceService.getAllWithMembers();
  }


  @Delete(':workspaceId/members/:memberId')
  @UseGuards(AuthGuard)
  async removeMember(
    @Param('workspaceId') workspaceId: number,
    @Param('memberId') memberId: number,
    @Req() req: any,
  ) {
    const currentUserId = req.user.id; 
    return this.workspaceService.deleteMember(workspaceId, memberId, currentUserId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }
}
