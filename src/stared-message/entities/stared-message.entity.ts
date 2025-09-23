import { Message } from "src/message/entities/message.entity";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StaredMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Message, message => message.stars, { onDelete: 'CASCADE' })
    message: Message;

    @ManyToOne(() => User, user => user.stars, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}
