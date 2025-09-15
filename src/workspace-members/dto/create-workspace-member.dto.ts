import { IsNotEmpty } from "class-validator";

export class CreateWorkspaceMemberDto {
    @IsNotEmpty()
    workspace_id: number;

    @IsNotEmpty()
    user_id: number;
}
