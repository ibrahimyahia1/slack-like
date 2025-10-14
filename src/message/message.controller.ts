import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  @UseGuards(AuthGuard)
  async createMessage(
    @Body() dto: CreateMessageDto,
    @Req() req: any,
  ) {
    const senderId = req.user.id;
    return this.messageService.createMessage(senderId, {
      ...dto
    });
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get('user/:userId')
  async getMessagesByUser(@Param('userId') userId: number) {
    return this.messageService.getMessagesBySender(userId);
  }

  @Get('channel/:channelId')
  async getMessagesByChannel(
    @Param('channelId') channelId: number,
    @Query('userId') userId?: number,
  ) {
    return this.messageService.getMessages(channelId, userId);
  }

  @Patch(':messageId')
  @UseGuards(AuthGuard)
  update(@Param('messageId') messageId: number, @Req() req: any, @Body() updateDto: UpdateMessageDto) {
    const editorId = req.user.id;
    return this.messageService.editMessage(editorId, messageId, updateDto);
  }

  @Delete(':messageId')
  @UseGuards(AuthGuard)
  delete(@Param('messageId') messageId: number, @Req() req: any) {
    const requesterId = req.user.id;
    return this.messageService.softDeleteMessage(requesterId, messageId);
  }
}
