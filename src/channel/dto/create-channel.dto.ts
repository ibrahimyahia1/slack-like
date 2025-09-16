import { IsString } from "class-validator";

export class CreateChannelDto {
    @IsString()
    name: string

    @IsString()
    channelType: string

    @IsString()
    status: string
}
