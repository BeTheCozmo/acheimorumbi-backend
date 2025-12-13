import { Module } from '@nestjs/common';
import { ContractGeneratorService } from './contract-generator.service';

@Module({
  controllers: [],
  providers: [ContractGeneratorService],
  exports: [ContractGeneratorService],
})
export class ContractGeneratorModule {}
