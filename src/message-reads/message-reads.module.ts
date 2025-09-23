import { Module } from '@nestjs/common';
import { MessageReadsService } from './message-reads.service';
import { MessageReadsController } from './message-reads.controller';

@Module({
  controllers: [MessageReadsController],
  providers: [MessageReadsService],
})
export class MessageReadsModule {}
