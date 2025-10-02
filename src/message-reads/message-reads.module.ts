import { Module } from '@nestjs/common';
import { MessageReadsService } from './message-reads.service';
import { MessageReadsController } from './message-reads.controller';
import { MessageRead } from './entities/message-read.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMember } from 'src/channel-members/entities/channel-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRead, ChannelMember])],
  controllers: [MessageReadsController],
  providers: [MessageReadsService],
})
export class MessageReadsModule {}
