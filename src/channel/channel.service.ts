import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { Workspace } from 'src/workspace/entities/workspace.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel) private readonly channelRepo: Repository<Channel>,
    @InjectRepository(Workspace)
    private readonly workspaceRepo: Repository<Workspace>,
  ) { }

  async create(createChannelDto: CreateChannelDto) {
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

    return await this.channelRepo.save(channel);
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
