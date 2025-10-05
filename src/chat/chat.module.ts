import { Module } from "@nestjs/common";
import { MessageMentionsModule } from "src/message-mentions/message-mentions.module";
import { MessageReactionModule } from "src/message-reaction/message-reaction.module";
import { MessageReadsModule } from "src/message-reads/message-reads.module";
import { MessageModule } from "src/message/message.module";
import { ChatGateway } from "./chat.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "src/message/entities/message.entity";
import { MessageReaction } from "src/message-reaction/entities/message-reaction.entity";
import { MessageRead } from "src/message-reads/entities/message-read.entity";
import { MessageMention } from "src/message-mentions/entities/message-mention.entity";
import { StaredMessage } from "src/stared-message/entities/stared-message.entity";
import { Channel } from "diagnostics_channel";
import { User } from "src/user/entities/user.entity";
import { ChannelMember } from "src/channel-members/entities/channel-member.entity";
import { MessageService } from "src/message/message.service";
import { MessageReactionService } from "src/message-reaction/message-reaction.service";
import { MessageReadsService } from "src/message-reads/message-reads.service";
import { StaredMessageService } from "src/stared-message/stared-message.service";
import { MessageMentionsService } from "src/message-mentions/message-mentions.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([
        Message,
        MessageReaction,
        MessageRead,
        MessageMention,
        StaredMessage,
        Channel,
        User,
        ChannelMember,
    ]), JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
            return {
                global: true,
                secret: config.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: config.get<string>("JWT_EXPIRES_IN") }
            }
        }
    }),
    ],
    providers: [
        ChatGateway,
        MessageService,
        MessageReactionService,
        MessageReadsService,
        StaredMessageService,
        MessageMentionsService,
    ],
    exports: [
        MessageService,
        MessageReactionService,
        MessageReadsService,
    ],
})
export class ChatModule { }
