import { Exclude } from "class-transformer";
import { ChannelMember } from "src/channel-members/entities/channel-member.entity";
import { MessageMention } from "src/message-mentions/entities/message-mention.entity";
import { MessageReaction } from "src/message-reaction/entities/message-reaction.entity";
import { MessageRead } from "src/message-reads/entities/message-read.entity";
import { Message } from "src/message/entities/message.entity";
import { StaredMessage } from "src/stared-message/entities/stared-message.entity";
import { WorkspaceMember } from "src/workspace-members/entities/workspace-member.entity";
import { Workspace } from "src/workspace/entities/workspace.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: '150' })
    username: string;

    @Column({ unique: true, length: '250' })
    email: string;

    @Exclude({ toPlainOnly: true })
    @Column({ select: false })
    password: string;

    @Column({ nullable: true })
    displayed_name: string;

    @Column({ nullable: true })
    lastOnline: Date;

    @Column({ nullable: true })
    avatar_url: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => WorkspaceMember, member => member.user)
    workspaceMembers: WorkspaceMember[];

    @OneToMany(() => Workspace, (workspace) => workspace.owner)
    ownedWorkspaces: Workspace[];

    @ManyToOne(() => ChannelMember, channelMember => channelMember.user)
    channelMember: ChannelMember;

    @OneToMany(() => Message, message => message.sender)
    messages: Message[]

    @OneToMany(() => MessageReaction, messageReaction => messageReaction.user)
    reactions: MessageReaction[]

    @OneToMany(() => MessageRead, messageRead => messageRead.user)
    reads: MessageRead[]

    @OneToMany(() => MessageMention, messageMention => messageMention.user)
    mentions: MessageMention[]

    @OneToMany(() => StaredMessage, staredMessage => staredMessage.user)
    stars: StaredMessage[]

}
