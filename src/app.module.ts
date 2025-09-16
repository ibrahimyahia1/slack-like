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
        entities: [User, Workspace, WorkspaceMember, Role, Channel, ChannelMember],
        synchronize: true,
        migrationsRun: true
      }),
      inject: [ConfigService]
    }),
    WorkspaceModule,
    WorkspaceMembersModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }