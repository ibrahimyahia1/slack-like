import { User } from "src/user/entities/user.entity";
import { WorkspaceMember } from "src/workspace-members/entities/workspace-member.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity";

@Entity()
export class Workspace extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    description: string
    
    @ManyToOne(() => User, user => user.ownedWorkspaces, { nullable: false })
    @JoinColumn({name: 'owner_user_id'})
    ownerUser: User;

    @OneToMany(() => WorkspaceMember, member => member.workspace)
    members: WorkspaceMember[];
}
