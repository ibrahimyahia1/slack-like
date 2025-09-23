import { Message } from "src/message/entities/message.entity";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MessageMention {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Message, message => message.mentions, { onDelete: 'CASCADE' })
    @JoinColumn({name: "message_id"})
    message: Message;

    @ManyToOne(() => User, user => user.mentions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}
