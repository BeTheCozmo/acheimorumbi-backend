import { Test, TestingModule } from '@nestjs/testing';
import { WitnessesController } from './witnesses.controller';
import { WitnessesService } from './witnesses.service';

describe('WitnessesController', () => {
  let controller: WitnessesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WitnessesController],
      providers: [WitnessesService],
    }).compile();

    controller = module.get<WitnessesController>(WitnessesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
