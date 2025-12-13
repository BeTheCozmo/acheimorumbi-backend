import { Test, TestingModule } from '@nestjs/testing';
import { PartyFormsService } from './party-forms.service';

describe('PartyFormsService', () => {
  let service: PartyFormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartyFormsService],
    }).compile();

    service = module.get<PartyFormsService>(PartyFormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
