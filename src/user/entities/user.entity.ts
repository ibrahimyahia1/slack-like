import { Exclude } from "class-transformer";
import { ChannelMember } from "src/channel-members/entities/channel-member.entity";
import { WorkspaceMember } from "src/workspace-members/entities/workspace-member.entity";
import { Workspace } from "src/workspace/entities/workspace.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: '150' })
    username: string;

    @Column({ unique: true, length: '250' })
    email: string;

    @Exclude({ toPlainOnly: true })
    @Column({ select: false })
    password: string;

    @Column({ nullable: true })
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

    @OneToMany(() => Workspace, (workspace) => workspace.owner)
    ownedWorkspaces: Workspace[];

    @OneToOne(() => ChannelMember, channelMember => channelMember.user)
    channelMember: ChannelMember;

}
