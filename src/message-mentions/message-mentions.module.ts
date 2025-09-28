import { Module } from '@nestjs/common';
import { MessageMentionsService } from './message-mentions.service';
import { MessageMentionsController } from './message-mentions.controller';
import { MessageMention } from './entities/message-mention.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessageMention])],
  controllers: [MessageMentionsController],
  providers: [MessageMentionsService],
})
export class MessageMentionsModule {}
