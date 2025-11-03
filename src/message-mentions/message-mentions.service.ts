import { Injectable } from '@nestjs/common';
import { CreateMessageMentionDto } from './dto/create-message-mention.dto';
import { UpdateMessageMentionDto } from './dto/update-message-mention.dto';
import { Brackets, Repository } from 'typeorm';
import { ALL_MENTION_USER } from 'src/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { MessageMention } from './entities/message-mention.entity';

type MentionSuggestion = User | {
  id: number;
  username: string;
  email: string;
  displayedName: string;
  lastOnline: Date | null;
  avatarUrl: string | null;
};

@Injectable()
export class MessageMentionsService {

  constructor(
    @InjectRepository(MessageMention)
    private messageMentionRepo: Repository<MessageMention>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  async searchMentions(query: string, channelId: number, requesterId: number) {
    const suggestions: MentionSuggestion[] = [];
    const clean = query.trim().toLowerCase();

    if (!clean || clean.startsWith('al')) {
      suggestions.push(
        {
          id: -1,
          username: 'all',
          email: "allusers@gmail.com",
          displayedName: 'Notify all members',
          lastOnline: null,
          avatarUrl: null
        }
      );
    }

    if (clean) {
      const users = await this.userRepo
        .createQueryBuilder('user')
        .innerJoin('user.channelMembers', 'channelMember')
        .innerJoin('channelMember.channel', 'channel') 
        .where('channel.id = :channelId', { channelId })
        .andWhere('user.id != :requesterId', { requesterId })
        .andWhere(
          new Brackets(qb => {
            qb.where('LOWER(user.username) LIKE :term', { term: `%${clean}%` })
              .orWhere('LOWER(user.displayedName) LIKE :term', { term: `%${clean}%` });
          }),
        )
        .orderBy('user.displayedName', 'ASC')
        .limit(9)
        .getMany();

      suggestions.push(...users);
    }

    return suggestions.slice(0, 10);
  }

  create(createMessageMentionDto: CreateMessageMentionDto) {
    return 'This action adds a new messageMention';
  }

  findAll() {
    return `This action returns all messageMentions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messageMention`;
  }

  update(id: number, updateMessageMentionDto: UpdateMessageMentionDto) {
    return `This action updates a #${id} messageMention`;
  }

  remove(id: number) {
    return `This action removes a #${id} messageMention`;
  }
}
