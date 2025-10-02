import { Injectable } from '@nestjs/common';
import { CreateMessageReadDto } from './dto/create-message-read.dto';
import { UpdateMessageReadDto } from './dto/update-message-read.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMember } from 'src/channel-members/entities/channel-member.entity';
import { MessageRead } from './entities/message-read.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageReadsService {
  constructor(
    @InjectRepository(ChannelMember) private readonly channelMemberRepo: Repository<ChannelMember>,
    @InjectRepository(MessageRead) private readonly messageReadRepo: Repository<MessageRead>,
  ) { }

  async markAsRead(userId: number, channelId: number, lastReadMessageId: number) {
    await this.channelMemberRepo.createQueryBuilder()
      .update()
      .set({ last_read_message_id: lastReadMessageId })
      .where('channel_id = :channelId AND user_id = :userId', { channelId, userId })
      .execute();

    const exists = await this.messageReadRepo.findOne({ where: { message: { id: lastReadMessageId } as any, user: { id: userId } as any } });
    if (!exists) {
      const mr = this.messageReadRepo.create({ message: { id: lastReadMessageId } as any, user: { id: userId } as any });
      await this.messageReadRepo.save(mr);
    }

    return { channelId, messageId: lastReadMessageId, userId };
  }

  async getReadReceipts(messageId: number) {
    return this.messageReadRepo.find({ where: { message: { id: messageId } as any }, relations: ['user'] });
  }

  create(createMessageReadDto: CreateMessageReadDto) {
    return 'This action adds a new messageRead';
  }

  findAll() {
    return `This action returns all messageReads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messageRead`;
  }

  update(id: number, updateMessageReadDto: UpdateMessageReadDto) {
    return `This action updates a #${id} messageRead`;
  }

  remove(id: number) {
    return `This action removes a #${id} messageRead`;
  }
}
