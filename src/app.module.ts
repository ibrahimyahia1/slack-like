import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { ChannelMembersModule } from './channel-members/channel-members.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { WorkspaceModule } from './workspace/workspace.module';
import { WorkspaceMembersModule } from './workspace-members/workspace-members.module';
import { Workspace } from './workspace/entities/workspace.entity';
import { WorkspaceMember } from './workspace-members/entities/workspace-member.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { Channel } from './channel/entities/channel.entity';
import { ChannelMember } from './channel-members/entities/channel-member.entity';
import { MessageModule } from './message/message.module';
import { MessageReadsModule } from './message-reads/message-reads.module';
import { MessageReactionModule } from './message-reaction/message-reaction.module';
import { MessageMentionsModule } from './message-mentions/message-mentions.module';
import { StaredMessageModule } from './stared-message/stared-message.module';
import { Message } from './message/entities/message.entity';
import { MessageRead } from './message-reads/entities/message-read.entity';
import { StaredMessage } from './stared-message/entities/stared-message.entity';
import { MessageMention } from './message-mentions/entities/message-mention.entity';
import { MessageReaction } from './message-reaction/entities/message-reaction.entity';


@Module({
  imports: [UserModule, ChannelModule, ChannelMembersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        migrationsRun: true
      }),
      inject: [ConfigService]
    }),
    WorkspaceModule,
    WorkspaceMembersModule,
    RoleModule,
    MessageModule,
    MessageReadsModule,
    MessageReactionModule,
    MessageMentionsModule,
    StaredMessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }