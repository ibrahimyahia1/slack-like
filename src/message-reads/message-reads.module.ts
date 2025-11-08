import { Module } from '@nestjs/common';
import { MessageReadsService } from './message-reads.service';
import { MessageReadsController } from './message-reads.controller';
import { MessageRead } from './entities/message-read.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMember } from 'src/channel-members/entities/channel-member.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRead, ChannelMember]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        global: true,
        secret: config.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: config.get<string>("JWT_EXPIRES_IN") }
      }
    }
  }),
    ConfigModule],
  controllers: [MessageReadsController],
  providers: [MessageReadsService],
})
export class MessageReadsModule { }
