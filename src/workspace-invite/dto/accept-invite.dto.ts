import { IsString, MinLength } from "class-validator";

export class AcceptInviteDto {
    @IsString()
    @MinLength(6)
    password: string;
}