import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
    channelId: number;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsString()
    @IsOptional()
    contentType?: string;

    @IsOptional()
    clientMessageId?: string;

    @IsOptional()
    @IsArray()
    mentions?: number[];
}
