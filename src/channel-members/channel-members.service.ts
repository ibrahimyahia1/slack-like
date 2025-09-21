import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChannelMemberDto } from './dto/create-channel-member.dto';
import { UpdateChannelMemberDto } from './dto/update-channel-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMember } from './entities/channel-member.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Channel } from 'src/channel/entities/channel.entity';
import { Role } from 'src/role/entities/role.entity';
import { channel } from 'diagnostics_channel';

@Injectable()
export class ChannelMembersService {
  constructor(
    @InjectRepository(ChannelMember) private readonly channelMemberRepo: Repository<ChannelMember>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Channel) private readonly channelRepo: Repository<Channel>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>


  ) { }

  async create(createChannelMemberDto: CreateChannelMemberDto) {
    const user = await this.userRepo.findOne({ where: { id: createChannelMemberDto.user_id } });
    if (!user) {
      throw new NotFoundException("this user not found");
    }

    const channel = await this.channelRepo.findOne({ where: { id: createChannelMemberDto.channel_id } });
    if (!channel) {
      throw new NotFoundException("this channel not found");
    }

    let role = await this.roleRepo.findOne({ where: { name: 'Member' } });

    if (!role) {
      role = this.roleRepo.create({ name: 'Member' });
      role = await this.roleRepo.save(role);
    }

    const channelMember = this.channelMemberRepo.create({
      channel: channel,
      user: user,
      role
    });

    if (channelMember) {
      throw new BadRequestException("this member already exist")
    }

    return await this.channelMemberRepo.save(channelMember);
  }

  async findAll() {
    const channelMember = await this.channelMemberRepo.find({
      relations: {
        channel: true,
        user: true
      }
    })
    return channelMember;
  }

  async findOne(memberId: number) {
    const member = await this.channelMemberRepo.findOne({
      where: { id: memberId },
      relations: {
        channel: true,
        user: true
      }
    })
    
    return member;
  }

  update(id: number, updateChannelMemberDto: UpdateChannelMemberDto) {
    return `This action updates a #${id} channelMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} channelMember`;
  }
}
