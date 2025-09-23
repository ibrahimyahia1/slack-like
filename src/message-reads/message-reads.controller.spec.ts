import { Test, TestingModule } from '@nestjs/testing';
import { MessageReadsController } from './message-reads.controller';
import { MessageReadsService } from './message-reads.service';

describe('MessageReadsController', () => {
  let controller: MessageReadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageReadsController],
      providers: [MessageReadsService],
    }).compile();

    controller = module.get<MessageReadsController>(MessageReadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
