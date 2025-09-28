import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRead } from 'src/message-reads/entities/message-read.entity';
import { MessageMention } from 'src/message-mentions/entities/message-mention.entity';
import { Message } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, MessageMention, MessageRead])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule { }
