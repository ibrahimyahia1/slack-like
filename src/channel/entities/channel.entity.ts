import { ChannelMember } from "src/channel-members/entities/channel-member.entity";
import { Workspace } from "src/workspace/entities/workspace.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Channel { 
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    channelType: string

    @Column()
    status: string

    @ManyToOne(() => Workspace, workspace => workspace.channel)
    @JoinColumn({ name: "workspace_id" })
    workspace: Workspace;

    @OneToMany(() => ChannelMember, channelMember => channelMember.channel)
    channelMember: ChannelMember;
}
