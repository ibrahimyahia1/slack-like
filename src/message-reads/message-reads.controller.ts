import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageReadsService } from './message-reads.service';
import { CreateMessageReadDto } from './dto/create-message-read.dto';
import { UpdateMessageReadDto } from './dto/update-message-read.dto';

@Controller('message-reads')
export class MessageReadsController {
  constructor(private readonly messageReadsService: MessageReadsService) {}

  @Post()
  create(@Body() createMessageReadDto: CreateMessageReadDto) {
    return this.messageReadsService.create(createMessageReadDto);
  }

  @Get()
  findAll() {
    return this.messageReadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageReadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageReadDto: UpdateMessageReadDto) {
    return this.messageReadsService.update(+id, updateMessageReadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageReadsService.remove(+id);
  }
}
