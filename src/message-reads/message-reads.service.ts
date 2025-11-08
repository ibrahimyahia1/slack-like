import { Injectable } from '@nestjs/common';
import { CreateMessageReadDto } from './dto/create-message-read.dto';
import { UpdateMessageReadDto } from './dto/update-message-read.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ChannelMember } from 'src/channel-members/entities/channel-member.entity';
import { MessageRead } from './entities/message-read.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Message } from 'src/message/entities/message.entity';

@Injectable()
export class MessageReadsService {
  constructor(
    @InjectRepository(ChannelMember) private readonly channelMemberRepo: Repository<ChannelMember>,
    @InjectRepository(MessageRead) private readonly messageReadRepo: Repository<MessageRead>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) { }

  async markAsRead(userId: number, channelId: number, lastReadMessageId: number) {
    return this.dataSource.transaction(async (manager) => {
      // Use 'lastReadMessage' (entity property) + set as relation
      await manager
        .getRepository(ChannelMember)
        .createQueryBuilder()
        .update()
        .set({
          lastReadMessage: { id: lastReadMessageId } as Message
        })
        .where('channel_id = :channelId AND user_id = :userId', { channelId, userId })
        .execute();

      // Optional: ensure MessageRead exists
      const readRepo = manager.getRepository(MessageRead);
      const exists = await readRepo.exist({
        where: {
          message: { id: lastReadMessageId },
          user: { id: userId }
        },
      });

      if (!exists) {
        await readRepo.save(
          readRepo.create({
            message: { id: lastReadMessageId },
            user: { id: userId },
          }),
        );
      }

      return { channelId, messageId: lastReadMessageId, userId };
    });
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
