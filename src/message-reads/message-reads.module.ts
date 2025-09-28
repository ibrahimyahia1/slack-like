import { Module } from '@nestjs/common';
import { MessageReadsService } from './message-reads.service';
import { MessageReadsController } from './message-reads.controller';
import { MessageRead } from './entities/message-read.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRead])],
  controllers: [MessageReadsController],
  providers: [MessageReadsService],
})
export class MessageReadsModule {}
