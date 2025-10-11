import { PartialType } from "@nestjs/mapped-types";
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

export class UpdateMessageDto extends PartialType(CreateMessageDto) { }
