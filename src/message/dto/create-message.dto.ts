export class CreateMessageDto {
    channelId: number;
    content: string;
    contentType?: string | null;
    clientMessageId?: string | null;
    mentions?: number[];
}
