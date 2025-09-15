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

  // @Put(':workspace_id')
  // async updatedWorkspace(@Param('workspace_id') workspace_id: number, @Body() body: UpdateWorkspaceDto) {
  //   return this.workspaceService.update(workspace_id, body)
  // }
}
