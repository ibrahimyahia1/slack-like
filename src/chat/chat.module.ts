import { Module } from "@nestjs/common";
import { MessageMentionsModule } from "src/message-mentions/message-mentions.module";
import { MessageReactionModule } from "src/message-reaction/message-reaction.module";
import { MessageReadsModule } from "src/message-reads/message-reads.module";
import { MessageModule } from "src/message/message.module";
import { ChatGateway } from "./chat.gateway";

@Module({
    imports: [
        MessageModule,
        MessageMentionsModule,
        MessageReactionModule,
        MessageReadsModule,
    ],
    providers: [ChatGateway],
})
export class ChatModule { }
