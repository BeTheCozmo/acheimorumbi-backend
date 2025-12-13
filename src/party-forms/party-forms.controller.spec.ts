import { Test, TestingModule } from '@nestjs/testing';
import { PartyFormsController } from './party-forms.controller';
import { PartyFormsService } from './party-forms.service';

describe('PartyFormsController', () => {
  let controller: PartyFormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartyFormsController],
      providers: [PartyFormsService],
    }).compile();

    controller = module.get<PartyFormsController>(PartyFormsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
