import { Channel } from "src/channel/entities/channel.entity";
import { Role } from "src/role/entities/role.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ChannelMember {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, user => user.channelMember)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Role, role => role.channelMember)
    @JoinColumn({ name: "role_id" })
    role: Role;

    @OneToOne(() => Channel, channel => channel.channelMember)
    @JoinColumn({ name: "channel_id" })
    channel: Channel;
}
