import { Role } from "src/role/entities/role.entity";
import { User } from "src/user/entities/user.entity";
import { Workspace } from "src/workspace/entities/workspace.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["workspace","user"])
export class WorkspaceMember {
    @PrimaryGeneratedColumn()
    id: number;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @ManyToOne(() => Workspace, workspace => workspace.members, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'workspace_id' })
    workspace: Workspace;

    @ManyToOne(() => User, user => user.workspaceMembers, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Role, role => role.workspaceMembers, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role: Role;
}
