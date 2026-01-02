import { Injectable } from '@nestjs/common';
import { CreateWitnessDto } from './dto/create-witness.dto';
import { UpdateWitnessDto } from './dto/update-witness.dto';
import { WitnessesRepository } from './witnesses.repository';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class WitnessesService {
  constructor(
    private readonly witnessesRepository: WitnessesRepository,
  ) {}
  create(createWitnessDto: CreateWitnessDto) {
    return this.witnessesRepository.create(createWitnessDto);
  }

  async findAll(filters?: Record<string, any>, limit?: number, offset?: number, page?: number): Promise<any[] | PaginatedResponse<any>> {
    const hasFilters = filters && Object.keys(filters).length > 0;
    const actualLimit = Number(limit) || 10;
    const actualOffset = page ? (Number(page) - 1) * actualLimit : (Number(offset) || 0);

    if (hasFilters || limit !== undefined || offset !== undefined || page !== undefined) {
      const { data, total } = await this.witnessesRepository.findAllFiltered(filters || {}, actualLimit, actualOffset);

      return {
        data,
        total,
        limit: actualLimit,
        ...(page ? { page } : { offset: actualOffset })
      };
    }

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
