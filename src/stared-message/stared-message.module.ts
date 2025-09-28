import { Module } from '@nestjs/common';
import { StaredMessageService } from './stared-message.service';
import { StaredMessageController } from './stared-message.controller';
import { StaredMessage } from './entities/stared-message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StaredMessage])],
  controllers: [StaredMessageController],
  providers: [StaredMessageService],
})
export class StaredMessageModule {}
