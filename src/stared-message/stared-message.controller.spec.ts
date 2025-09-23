import { Test, TestingModule } from '@nestjs/testing';
import { StaredMessageController } from './stared-message.controller';
import { StaredMessageService } from './stared-message.service';

describe('StaredMessageController', () => {
  let controller: StaredMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaredMessageController],
      providers: [StaredMessageService],
    }).compile();

    controller = module.get<StaredMessageController>(StaredMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
