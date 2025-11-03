import { Channel } from "src/channel/entities/channel.entity";
import { Message } from "src/message/entities/message.entity";
import { Role } from "src/role/entities/role.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['user', 'channel'])
export class ChannelMember {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    last_read_message_id?: number;

    @ManyToOne(() => User, user => user.channelMembers, { eager: true })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Role, role => role.channelMember, { eager: true })
    @JoinColumn({ name: "role_id" })
    role: Role;

    @ManyToOne(() => Channel, channel => channel.members)
    @JoinColumn({ name: "channel_id" })
    channel: Channel;

    @ManyToOne(() => Message, { nullable: true })
    @JoinColumn({ name: 'last_read_message_id' }) 
    lastReadMessage?: Message;
}
