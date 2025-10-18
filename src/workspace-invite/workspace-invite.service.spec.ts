import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceInviteService } from './workspace-invite.service';

describe('WorkspaceInviteService', () => {
  let service: WorkspaceInviteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceInviteService],
    }).compile();

    service = module.get<WorkspaceInviteService>(WorkspaceInviteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
