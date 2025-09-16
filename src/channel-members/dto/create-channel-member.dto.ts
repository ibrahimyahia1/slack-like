import { IsNotEmpty } from "class-validator";

export class CreateChannelMemberDto {
    @IsNotEmpty()
    channel_id: number

    @IsNotEmpty()
    user_id: number
}
