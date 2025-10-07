import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMessageReactionDto {
    @IsNumber()
    @IsNotEmpty()
    messageId: number;

    @IsString()
    emoji: string;
}
