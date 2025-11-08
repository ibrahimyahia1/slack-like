import { Message } from "src/message/entities/message.entity";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['message', 'user'])
@Index(['user', 'message'])
export class MessageRead {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    readAt: Date;
    
    @ManyToOne(() => Message, message => message.reads, { onDelete: 'CASCADE' })
    @JoinColumn({name: "message_id"})
    message: Message;

    @ManyToOne(() => User, user => user.reads, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_id" })
    user: User;

}
