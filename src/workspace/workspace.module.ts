import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceMember } from 'src/workspace-members/entities/workspace-member.entity';
import { Role } from 'src/role/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, WorkspaceMember, Role]),
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
      ConfigModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
