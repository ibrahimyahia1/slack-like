import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChannelMember } from "src/channel-members/entities/channel-member.entity";
import { MessageReactionService } from "src/message-reaction/message-reaction.service";
import { MessageReadsService } from "src/message-reads/message-reads.service";
import { MessageService } from "src/message/message.service";
import { Repository } from "typeorm";

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(
        private readonly jwtService: JwtService,
        private readonly messageService: MessageService,
        private readonly reactionService: MessageReactionService,
        private readonly readService: MessageReadsService,
        @InjectRepository(ChannelMember) private readonly channelMemberRepo: Repository<ChannelMember>,
    ) { }

    handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth?.token || client.handshake.headers['authorization']?.split(' ')[1];
            const payload = this.jwtService.verify(token);
            client.data.user = { id: payload.sub, username: payload.username };
            client.join(`user_${payload.sub}`);
        } catch (err) {
            client.emit('error', 'Authentication failed');
            client.disconnect(true);
        }
    }
    handleDisconnect(client: Socket) {
        const userId = client.data?.user?.id;
        if (userId) {
            this.server.emit('user_offline', { userId });
        }
    }

    @SubscribeMessage('join_channel')
    async handleJoin(client: Socket, payload: { channelId: number }) {
        const userId = client.data.user.id;
        const membership = await this.channelMemberRepo.findOne({ where: { channel: { id: payload.channelId } as any, user: { id: userId } as any } })
        if (!membership) return client.emit('error', 'not a channel member');
        client.join(`channel_${payload.channelId}`);
        this.server.to(`channel_${payload.channelId}`).emit('presence_update', { userId, online: true });
    }


    @SubscribeMessage('leave_channel')
    async handleLeave(client: Socket, payload: { channelId: number }) {
        client.leave(`channel_${payload.channelId}`);
        this.server.to(`channel_${payload.channelId}`).emit('presence_update', { userId: client.data.user.id, online: false });
    }


    @SubscribeMessage('send_message')
    async handleSendMessage(client: Socket, payload: any) {
        const userId = client.data.user.id;
        const isMember = await this.channelMemberRepo.findOne({ where: { channel: { id: payload.channelId } as any, user: { id: userId } as any } });
        if (!isMember) return client.emit('error', 'member not found')
        const msg = await this.messageService.sendMessage(userId, payload);
        this.server.to(`channel_${payload.channelId}`).emit('new message', msg);
        if (payload.mentions?.length) {
            for (const uid of payload.mentions) {
                this.server.to(`user_${uid}`).emit('mentioned', { by: userId, message: msg, channelId: payload.channelId });
            }
        }
    }

    @SubscribeMessage('add_reaction')
    async handleReaction(client: Socket, data: { messageId: number; emoji: string; channelId: number }) {
        const userId = client.data.user.id;
        const result = await this.reactionService.createReaction(userId, data.messageId, data.emoji);
        this.server.to(`channel_${data.channelId}`).emit('message_reaction', result)
    }

    @SubscribeMessage('make_as_read')
    async handleMakeAsRead(client: Socket, data: { channelId: number; lastReadMessageId: number }) {
        const userId = client.data.user.id;
        const res = await this.readService.markAsRead(userId, data.channelId, data.lastReadMessageId);
        this.server.to(`channel_${data.channelId}`).emit('message_read', res);
    }
}