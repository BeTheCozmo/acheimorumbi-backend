import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistTitlesService } from './checklist-titles.service';

describe('ChecklistTitlesService', () => {
  let service: ChecklistTitlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChecklistTitlesService],
    }).compile();

    service = module.get<ChecklistTitlesService>(ChecklistTitlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
