import { Test, TestingModule } from '@nestjs/testing';
import { WitnessesService } from './witnesses.service';

describe('WitnessesService', () => {
  let service: WitnessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WitnessesService],
    }).compile();

    service = module.get<WitnessesService>(WitnessesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
