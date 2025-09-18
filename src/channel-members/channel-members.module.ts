import { Module } from '@nestjs/common';
import { ChannelMembersService } from './channel-members.service';
import { ChannelMembersController } from './channel-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMember } from './entities/channel-member.entity';
import { User } from 'src/user/entities/user.entity';
import { Channel } from 'src/channel/entities/channel.entity';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelMember, User, Channel, Role])],
  controllers: [ChannelMembersController],
  providers: [ChannelMembersService],
})
export class ChannelMembersModule {}
