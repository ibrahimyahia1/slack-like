import { Test, TestingModule } from '@nestjs/testing';
import { MessageReadsService } from './message-reads.service';

describe('MessageReadsService', () => {
  let service: MessageReadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageReadsService],
    }).compile();

    service = module.get<MessageReadsService>(MessageReadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
