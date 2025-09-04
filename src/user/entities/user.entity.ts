import { WorkspaceMember } from "src/workspace-members/entities/workspace-member.entity";
import { Workspace } from "src/workspace/entities/workspace.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ nullable: true })
    user_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    role: string

    @Column()
    password: string;

    @Column()
    displayed_name: string;

    @Column({ nullable: true })
    lastOnline: Date;

    @Column({ nullable: true })
    avatar_url: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => WorkspaceMember, member => member.user)
    workspaceMembers: WorkspaceMember[];

    @OneToMany(() => Workspace, (workspace) => workspace.ownerUser)
    ownedWorkspaces: Workspace[];

}
