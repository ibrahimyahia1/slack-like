import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceInviteController } from './workspace-invite.controller';
import { WorkspaceInviteService } from './workspace-invite.service';

describe('WorkspaceInviteController', () => {
  let controller: WorkspaceInviteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceInviteController],
      providers: [WorkspaceInviteService],
    }).compile();

    controller = module.get<WorkspaceInviteController>(WorkspaceInviteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
