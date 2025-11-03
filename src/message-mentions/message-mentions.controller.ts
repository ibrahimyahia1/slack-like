import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { MessageMentionsService } from './message-mentions.service';
import { CreateMessageMentionDto } from './dto/create-message-mention.dto';
import { UpdateMessageMentionDto } from './dto/update-message-mention.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';

@Controller('message-mentions')
export class MessageMentionsController {
  constructor(private readonly messageMentionsService: MessageMentionsService) {}

  @UseGuards(AuthGuard)
  @Get('search')
  async search(
    @Query('q') q: string,
    @Query('channelId') channelId: number,
    @Req() req,
  ) {
    const users = await this.messageMentionsService.searchMentions(q || '', channelId, req.user.id);
    return {
      ok: true,
      users: users.map(u => ({
        id: u.id,
        username: u.username,
        displayedName: u.displayedName,
        avatarUrl: u.avatarUrl,
      })),
    };
  }

  @Post()
  create(@Body() createMessageMentionDto: CreateMessageMentionDto) {
    return this.messageMentionsService.create(createMessageMentionDto);
  }

  @Get()
  findAll() {
    return this.messageMentionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageMentionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageMentionDto: UpdateMessageMentionDto) {
    return this.messageMentionsService.update(+id, updateMessageMentionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageMentionsService.remove(+id);
  }
}
