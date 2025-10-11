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
    @InjectRepository(Channel) private readonly channelRepo: Repository<Channel>,
    @InjectRepository(MessageMention) private readonly mentionRepo: Repository<MessageMention>,
    @InjectRepository(MessageRead) private readonly messageReadRepo: Repository<MessageRead>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) { }


  async createMessage(senderId: number, dto: CreateMessageDto) {
    return this.dataSource.transaction(async (manager) => {
      const message = manager.create(Message, {
        content: dto.content,
        contentType: dto.contentType,
        sender: { id: senderId } as User,
        channel: { id: dto.channelId } as Channel,
        clientMessageId: dto.clientMessageId,
      } as DeepPartial<Message>);
      const savedMessage = await manager.save(message);

      let mentionedUsers: User[] = [];
      if (dto.mentions?.length) {
        mentionedUsers = await manager.getRepository(User).find({
          where: { id: In(dto.mentions) },
        });

        const mentions = mentionedUsers.map((user) =>
          manager.create(MessageMention, {
            message: savedMessage,
            user,
          }),
        );
        await manager.save(mentions);
      }

      const fullMessage = await manager.findOne(Message, {
        where: { id: savedMessage.id },
        relations: { sender: true },
      });

      return {
        ...fullMessage,
        mentions: mentionedUsers
      };
    });
  }

  async sendMessage(senderId: number, createMessageDto: CreateMessageDto) {
    return await this.dataSource.transaction(async manager => {
      const msg = manager.create(Message, {
        content: createMessageDto.content,
        content_type: createMessageDto.contentType ?? null,
        sender: { id: senderId } as User,
        channel: { id: createMessageDto.channelId } as Channel,
        client_message_id: createMessageDto.clientMessageId ?? null,
      });
      const saved = await manager.save(msg)

      if (createMessageDto.mentions?.length) {
        const mentions = createMessageDto.mentions.map(uid => manager.create(MessageMention, {
          message: saved,
          user: { id: uid } as User
        }));
        await manager.save(mentions)
      }

      const read = manager.create(MessageRead, { message: saved, user: { id: senderId } as User })
      await manager.save(read);

      const result = await manager.findOne(Message, {
        where: { id: saved.id, },
        relations: {
          sender: true
        }
      });
      return result
    })
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

    message.isDeleted = true;
    return await this.messageRepo.save(message);
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
