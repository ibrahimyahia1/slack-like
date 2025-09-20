import { ChannelMember } from "src/channel-members/entities/channel-member.entity";
import { WorkspaceMember } from "src/workspace-members/entities/workspace-member.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role { 
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string 

    @OneToMany(() => WorkspaceMember, wm => wm.role)
    workspaceMembers: WorkspaceMember[];

    @OneToMany(() => ChannelMember, channelMember => channelMember.user)
    channelMember: ChannelMember[];
}
