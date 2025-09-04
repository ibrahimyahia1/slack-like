import { Role } from "src/role/entities/role.entity";
import { User } from "src/user/entities/user.entity";
import { Workspace } from "src/workspace/entities/workspace.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WorkspaceMember {
    @PrimaryGeneratedColumn()
    id: number;    

    @ManyToOne(() => Workspace, workspace => workspace.members, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'workspace_id' })
    workspace: Workspace;

    @ManyToOne(() => User, user => user.workspaceMembers, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Role, role => role.workspaceMembers, { eager: true })
    @JoinColumn({name: 'role_id'})
    role: Role;
}
