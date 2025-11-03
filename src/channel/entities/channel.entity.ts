import { ChannelMember } from "src/channel-members/entities/channel-member.entity";
import { MessageMention } from "src/message-mentions/entities/message-mention.entity";
import { Message } from "src/message/entities/message.entity";
import { BaseEntity } from "src/workspace/entities/base-entity";
import { Workspace } from "src/workspace/entities/workspace.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// export enum ChannelType {
//     DM = 'dm',
//     PUBLIC = 'public',
//     PRIVATE = 'private'
// }
@Entity()
export class Channel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    // @Column({ type: 'enum', enum: ChannelType, default: ChannelType.PUBLIC })
    // type: ChannelType;

    @Column()
    channelType: string

    @Column({ default: 'active' })
    status: string

    @ManyToOne(() => Workspace, workspace => workspace.channel)
    @JoinColumn({ name: "workspace_id" })
    workspace: Workspace;

    @OneToMany(() => ChannelMember, members => members.channel)
    members: ChannelMember[];

    @OneToMany(() => Message, message => message.channel)
    messages: Message[]

    @OneToMany(() => MessageMention, mentions => mentions.channel)
    mentions: MessageMention[]
}
