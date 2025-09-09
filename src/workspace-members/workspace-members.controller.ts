import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkspaceMembersService } from './workspace-members.service';
import { CreateWorkspaceMemberDto } from './dto/create-workspace-member.dto';

@Controller('workspace-members')
export class WorkspaceMembersController {
  constructor(private readonly workspaceMembersService: WorkspaceMembersService) {}

  @Post()
  create(@Body() createWorkspaceMemberDto: CreateWorkspaceMemberDto) {
    return this.workspaceMembersService.create(createWorkspaceMemberDto);
  }

}
