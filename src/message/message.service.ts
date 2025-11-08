import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { MessageMention } from 'src/message-mentions/entities/message-mention.entity';
import { MessageRead } from 'src/message-reads/entities/message-read.entity';
import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Channel } from 'src/channel/entities/channel.entity';
import { MessageReaction } from 'src/message-reaction/entities/message-reaction.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) { }


  async sendMessage(senderId: number, dto: CreateMessageDto) {
    return this.dataSource.transaction(async (manager) => {
      const message = manager.create(Message, {
        content: dto.content,
        contentType: dto.contentType,
        sender: { id: senderId } as User,
        channel: { id: dto.channelId } as Channel,
        clientMessageId: dto.clientMessageId,
      });
      const savedMessage = await manager.save(message);

      let mentionedUsers: User[] = [];
      const originalMentions = dto.mentions || [];

      if (originalMentions.length > 0) {
        const realUserIds = originalMentions.filter(id => id !== -1 && id !== senderId);

        if (realUserIds.length > 0) {
          mentionedUsers = await manager.getRepository(User).find({
            where: { id: In(realUserIds) },
          });

          const mentions = mentionedUsers.map(user =>
            manager.create(MessageMention, {
              message: savedMessage,
              user,
            }),
          );
          await manager.save(mentions);
        }
      }

      await manager.save(
        manager.create(MessageRead, {
          message: savedMessage,
          user: { id: senderId } as User,
        }),
      );

      const fullMessage = await manager.findOne(Message, {
        where: { id: savedMessage.id },
        relations: { sender: true },
      });

      return {
        ...fullMessage,
        mentions: mentionedUsers,        //  For frontend UI 
        mentionIds: originalMentions,    //  For WebSocket 
      };
    });
  }


  async editMessage(editorId: number, messageId: number, updateDto: UpdateMessageDto) {
    const message = await this.messageRepo.findOne({ where: { id: messageId }, relations: { sender: true } });
    if (!message) throw new NotFoundException('This message not found!');

    if (message.sender.id !== editorId) throw new ForbiddenException('Not message owner');

    Object.assign(message, updateDto);
    message.editedAt = new Date();

    return await this.messageRepo.save(message);
  }

  async softDeleteMessage(requesterId: number, messageId: number) {
    const message = await this.messageRepo.findOne({ where: { id: messageId }, relations: { sender: true } });
    if (!message) throw new NotFoundException('This message not found!');

    if (message.sender.id !== requesterId) throw new ForbiddenException('Not message owner');

    await this.messageRepo.softDelete(messageId);
    return 'This message is soft deleted'
  }


  async findAll() {
    return await this.messageRepo.find({
      relations: {
        sender: true,
        reactions: true,
        mentions: {
          user: true
        }
      }
    })
  }

  async getMessagesBySender(senderId: number) {
    return this.messageRepo.find({
      where: { sender: { id: senderId } },
      relations: {
        sender: true,
        channel: true,
        mentions: true,
        reactions: true
      },
      order: { createdAt: 'DESC' },
    });
  }

  async getMessages(channelId: number, senderId?: number) {
    const filters: any = {
      channel: { id: channelId },
    };

    if (senderId) {
      filters.sender = { id: senderId };
    }

    return this.messageRepo.find({
      where: filters,
      relations: {
        sender: true,
        channel: true,
        mentions: true,
        reactions: true
      },
      order: { createdAt: 'DESC' },
    });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
