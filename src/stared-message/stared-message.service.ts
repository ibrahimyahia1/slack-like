import { Injectable } from '@nestjs/common';
import { CreateStaredMessageDto } from './dto/create-stared-message.dto';
import { UpdateStaredMessageDto } from './dto/update-stared-message.dto';

@Injectable()
export class StaredMessageService {
  create(createStaredMessageDto: CreateStaredMessageDto) {
    return 'This action adds a new staredMessage';
  }

  findAll() {
    return `This action returns all staredMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staredMessage`;
  }

  update(id: number, updateStaredMessageDto: UpdateStaredMessageDto) {
    return `This action updates a #${id} staredMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} staredMessage`;
  }
}
