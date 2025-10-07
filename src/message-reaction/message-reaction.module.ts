import { Module } from '@nestjs/common';
import { MessageReactionService } from './message-reaction.service';
import { MessageReactionController } from './message-reaction.controller';
import { MessageReaction } from './entities/message-reaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/message/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageReaction, Message])],
  controllers: [MessageReactionController],
  providers: [MessageReactionService],
})
export class MessageReactionModule {}
