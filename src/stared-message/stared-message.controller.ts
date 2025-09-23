import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaredMessageService } from './stared-message.service';
import { CreateStaredMessageDto } from './dto/create-stared-message.dto';
import { UpdateStaredMessageDto } from './dto/update-stared-message.dto';

@Controller('stared-message')
export class StaredMessageController {
  constructor(private readonly staredMessageService: StaredMessageService) {}

  @Post()
  create(@Body() createStaredMessageDto: CreateStaredMessageDto) {
    return this.staredMessageService.create(createStaredMessageDto);
  }

  @Get()
  findAll() {
    return this.staredMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staredMessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaredMessageDto: UpdateStaredMessageDto) {
    return this.staredMessageService.update(+id, updateStaredMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staredMessageService.remove(+id);
  }
}
