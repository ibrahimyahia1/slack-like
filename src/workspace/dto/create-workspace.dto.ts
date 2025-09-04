import { IsNotEmpty, IsString } from "class-validator"

export class CreateWorkspaceDto {
    workspace_id: number;
    workspace_name: string;
    description: string;
    created_at: Date;
    updated_at: Date;

    owner?: {
        user_id: number;
        username: string;
        displayed_name: string;
        avatar_url: string;
    } | null;

    members: Array<{
        user_id: number;
        username: string;
        displayed_name: string;
        avatar_url: string;
        role: string;
        joined_at?: Date;
    }>;
}
