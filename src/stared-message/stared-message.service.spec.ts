import { Test, TestingModule } from '@nestjs/testing';
import { StaredMessageService } from './stared-message.service';

describe('StaredMessageService', () => {
  let service: StaredMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaredMessageService],
    }).compile();

    service = module.get<StaredMessageService>(StaredMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
