import { Channel } from "src/channel/entities/channel.entity";
import { Role } from "src/role/entities/role.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['user', 'channel'])
export class ChannelMember {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.channelMember, { eager: true })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Role, role => role.channelMember, { eager: true })
    @JoinColumn({ name: "role_id" })
    role: Role;

    @ManyToOne(() => Channel, channel => channel.members)
    @JoinColumn({ name: "channel_id" })
    channel: Channel;
}
