import { Message } from "src/message/entities/message.entity";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
