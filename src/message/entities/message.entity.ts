import { Exclude } from "class-transformer";
import { Channel } from "src/channel/entities/channel.entity";
import { MessageMention } from "src/message-mentions/entities/message-mention.entity";
import { MessageReaction } from "src/message-reaction/entities/message-reaction.entity";
import { MessageRead } from "src/message-reads/entities/message-read.entity";
import { StaredMessage } from "src/stared-message/entities/stared-message.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['clientMessageId', 'sender'])
@Index(['channel', 'createdAt'])
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({ nullable: true })
    contentType?: string;

    @ManyToOne(() => User, user => user.messages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "sender_id" })
    sender: User;

    @ManyToOne(() => Channel, channel => channel.messages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "channel_id" })
    channel: Channel;

    @Column({ default: false })
    isPinned: boolean;

    @Column({ nullable: true })
    clientMessageId?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    editedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => MessageReaction, reaction => reaction.message)
    reactions: MessageReaction[];

    @OneToMany(() => MessageRead, read => read.message)
    reads: MessageRead[];

    @OneToMany(() => MessageMention, mention => mention.message)
    mentions: MessageMention[];

    @OneToMany(() => StaredMessage, star => star.message)
    stars: StaredMessage[];
}
