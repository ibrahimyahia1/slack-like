import { Module } from '@nestjs/common';
import { MessageMentionsService } from './message-mentions.service';
import { MessageMentionsController } from './message-mentions.controller';
import { MessageMention } from './entities/message-mention.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Channel } from 'src/channel/entities/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageMention, User, Channel]),
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
  controllers: [MessageMentionsController],
  providers: [MessageMentionsService],
})
export class MessageMentionsModule { }
