import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspaceService.create(createWorkspaceDto);
  }

  @Get(':id')
  async getWorkspace(@Param('id') workspaceId: number) {
    return this.workspaceService.getWorkspaceWithOwnerAndMembers(workspaceId);
  }

  @Put(':workspace_id')
  async updatedWorkspace(@Param('workspace_id') workspace_id: number, @Body() body: UpdateWorkspaceDto) {
    return this.workspaceService.update(workspace_id, body)
  }
}
