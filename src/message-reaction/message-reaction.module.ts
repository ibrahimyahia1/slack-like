import { Module } from '@nestjs/common';
import { MessageReactionService } from './message-reaction.service';
import { MessageReactionController } from './message-reaction.controller';
import { MessageReaction } from './entities/message-reaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessageReaction])],
  controllers: [MessageReactionController],
  providers: [MessageReactionService],
})
export class MessageReactionModule {}
