import {
  Controller, Post, Body, Param, UseGuards, Req, BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { WorkspaceInviteService } from './workspace-invite.service';
import { SendInviteDto } from './dto/send-invite.dto';
import { AcceptInviteDto } from './dto/accept-invite.dto';

@Controller('workspace-invites')
export class WorkspaceInviteController {
  constructor(private inviteService: WorkspaceInviteService) { }

  @Post()
  @UseGuards(AuthGuard)
  async sendInvite(@Req() req, @Body() dto: SendInviteDto) {
    return this.inviteService.sendInvite(req.user.id, dto.email);
  }

  @Post(':token/accept')
  async acceptInvite(@Param('token') token: string, @Body() dto: AcceptInviteDto) {
    if (!token || token.length !== 64) {
      throw new BadRequestException('Invalid token format');
    }
    return this.inviteService.acceptInvite(token, dto);
  }
}