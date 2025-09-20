import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { ChannelMember } from 'src/channel-members/entities/channel-member.entity';
import { Role } from 'src/role/entities/role.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, Workspace, ChannelMember, Role]),
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
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule { }
