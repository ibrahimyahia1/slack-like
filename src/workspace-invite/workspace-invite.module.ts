import { Module } from '@nestjs/common';
import { WorkspaceInviteService } from './workspace-invite.service';
import { WorkspaceInviteController } from './workspace-invite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { WorkspaceInvite } from './entities/workspace-invite.entity';
import { User } from 'src/user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceInvite, User]),
  JwtModule.registerAsync({
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
  ConfigModule
  ],
  controllers: [WorkspaceInviteController],
  providers: [WorkspaceInviteService],
})
export class WorkspaceInviteModule {}
