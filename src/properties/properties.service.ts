import { Inject, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesRepository } from './properties.repository';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class PropertiesService {
  @Inject() propertiesRepository: PropertiesRepository;
  create(createPropertyDto: CreatePropertyDto) {
    return this.propertiesRepository.create(createPropertyDto);
  }

  async findAll(filters?: Record<string, any>, limit?: number, offset?: number, page?: number): Promise<any[] | PaginatedResponse<any>> {
    const hasFilters = filters && Object.keys(filters).length > 0;
    const actualLimit = Number(limit) || 10;
    const actualOffset = page ? (Number(page) - 1) * actualLimit : (Number(offset) || 0);

    if (hasFilters || limit !== undefined || offset !== undefined || page !== undefined) {
      const { data, total } = await this.propertiesRepository.findAllFiltered(filters || {}, actualLimit, actualOffset);

      return {
        data,
        total,
        limit: actualLimit,
        ...(page ? { page } : { offset: actualOffset })
      };
    }

    return this.propertiesRepository.findAll();
  }

  findOne(id: number) {
    return this.propertiesRepository.findOne(id);
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesRepository.update(id, updatePropertyDto);
  }

  remove(id: number) {
    return this.propertiesRepository.remove(id);
  }
}
