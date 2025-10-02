import { Message } from "src/message/entities/message.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['message', 'user', 'emoji'])
export class MessageReaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Message, message => message.reactions, { onDelete: 'CASCADE' })
    @JoinColumn({name: "message_id"})
    message: Message;

    @ManyToOne(() => User, user => user.reactions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    emoji: string;

    @CreateDateColumn()
    reacted_at: Date;

    @Column({ default: false })
    isDeleted: boolean;

    @UpdateDateColumn()
    editedAt: Date;
}
