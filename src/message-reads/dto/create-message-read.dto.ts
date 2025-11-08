import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMessageReadDto {
    @IsNumber()
    @IsNotEmpty()
    channelId: number;

    @IsNumber()
    @IsNotEmpty()
    lastReadMessageId: number;
}
