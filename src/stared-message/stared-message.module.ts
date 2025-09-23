import { Module } from '@nestjs/common';
import { StaredMessageService } from './stared-message.service';
import { StaredMessageController } from './stared-message.controller';

@Module({
  controllers: [StaredMessageController],
  providers: [StaredMessageService],
})
export class StaredMessageModule {}
