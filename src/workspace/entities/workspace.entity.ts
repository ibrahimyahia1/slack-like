import { User } from "src/user/entities/user.entity";
import { WorkspaceMember } from "src/workspace-members/entities/workspace-member.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity";
import { Channel } from "src/channel/entities/channel.entity";

@Entity()
export class Workspace extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => User, user => user.ownedWorkspaces, { nullable: true })
    @JoinColumn({ name: 'owner_user_id' })
    owner: User;

    @OneToMany(() => WorkspaceMember, member => member.workspace)
    members: WorkspaceMember[];

    @OneToMany(() => Channel, channel => channel.workspace)
    channel: Channel[];
}
