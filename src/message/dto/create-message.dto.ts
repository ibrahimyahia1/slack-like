import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
    @IsNumber()
    @IsNotEmpty()
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
