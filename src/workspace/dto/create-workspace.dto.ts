import { IsNotEmpty, IsString } from "class-validator"

export class CreateWorkspaceDto {
    name: string;
    description: string;
    
}
