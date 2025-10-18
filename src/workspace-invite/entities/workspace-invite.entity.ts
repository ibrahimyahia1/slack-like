import { InviteStatus } from 'src/enums/invite-status.enum';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';



@Entity()
export class WorkspaceInvite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    token: string;

    @Column()
    email: string;

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    inviter: User;

    @Column({
        type: 'enum',
        enum: InviteStatus,
        default: InviteStatus.PENDING,
    })
    status: InviteStatus;

    @Column({ type: 'timestamptz' })
    expiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}