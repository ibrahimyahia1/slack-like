import { Injectable } from '@nestjs/common';
import { CreateMessageReactionDto } from './dto/create-message-reaction.dto';
import { UpdateMessageReactionDto } from './dto/update-message-reaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageReaction } from './entities/message-reaction.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MessageReactionService {
  constructor(
    @InjectRepository(MessageReaction) private readonly reactionRepo: Repository<MessageReaction>,
    private readonly dataSource: DataSource,
  ) { }

  async createReaction(userId: number, messageId: number, emoji: string) {
    return await this.dataSource.transaction(async manager => {
      const existing = await manager.findOne(MessageReaction, { where: { message: { id: messageId }, user: { id: userId }, emoji } });

      if (existing) {
        await manager.remove(existing);
        return { action: "removed", messageId, userId, emoji }
      } else {
        const reaction = manager.create(MessageReaction, { message: { id: messageId }, user: { id: userId }, emoji });
        const saved = await manager.save(reaction);
        return { action: "added", userId, messageId, emoji, id: saved.id}
      }
    })
  };

  async getReactionsForMessage(messageId: number) {
    return this.reactionRepo.find({ where: { message: { id: messageId } as any }, relations: ['user'] });
  }

  findAll() {
    return `This action returns all messageReaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messageReaction`;
  }

  update(id: number, updateMessageReactionDto: UpdateMessageReactionDto) {
    return `This action updates a #${id} messageReaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} messageReaction`;
  }
}
