import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { ChannelMember } from 'src/channel-members/entities/channel-member.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel) private readonly channelRepo: Repository<Channel>,
    @InjectRepository(Workspace)
    private readonly workspaceRepo: Repository<Workspace>,
    @InjectRepository(ChannelMember)
    private channelMemberRepo: Repository<ChannelMember>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) { }

  async create(createChannelDto: CreateChannelDto, currentUserId: number) {
    const workspace = await this.workspaceRepo.findOne({ where: { id: createChannelDto.workspace_id } });
    if (!workspace) {
      throw new NotFoundException("this workspace not found")
    }
    const channel = this.channelRepo.create({
      name: createChannelDto.name,
      channelType: createChannelDto.channelType,
      status: createChannelDto.status,
      workspace: workspace,
    });
    await this.channelRepo.save(channel); 

    let ownerRole = await this.roleRepo.findOne({ where: { name: "Owner" } });
    if (!ownerRole) {
      ownerRole = this.roleRepo.create({ name: "Owner" });
      await this.roleRepo.save(ownerRole);
    }

    const ownerMember = this.channelMemberRepo.create({
      channel,
      user: { id: currentUserId } as User,
      role: ownerRole
    });
    await this.channelMemberRepo.save(ownerMember)

    return await this.channelRepo.findOne({
      where: { id: channel.id },
      relations: {
        members: {
          user: true,
          role: true
        }
      }
    });
  }


  findAll() {
    return `This action returns all channel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} channel`;
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
