import { Injectable } from '@nestjs/common';
import { CreateWitnessDto } from './dto/create-witness.dto';
import { UpdateWitnessDto } from './dto/update-witness.dto';
import { WitnessesRepository } from './witnesses.repository';

@Injectable()
export class WitnessesService {
  constructor(
    private readonly witnessesRepository: WitnessesRepository,
  ) {}
  create(createWitnessDto: CreateWitnessDto) {
    return this.witnessesRepository.create(createWitnessDto);
  }

  findAll() {
    return this.witnessesRepository.findAll();
  }

  findOne(id: number) {
    return this.witnessesRepository.findOne(id);
  }

  update(id: number, updateWitnessDto: UpdateWitnessDto) {
    return this.witnessesRepository.update(id, updateWitnessDto);
  }

  remove(id: number) {
    return this.witnessesRepository.remove(id);
  }
}
