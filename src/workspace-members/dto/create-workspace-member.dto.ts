import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateWorkspaceMemberDto {
    @IsNotEmpty()
    workspace_id: number;

    @IsNotEmpty()
    user_id: number;

    @IsOptional()
    @IsString()
    roleName?: string;
}
