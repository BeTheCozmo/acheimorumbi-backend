import { Injectable } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { ConfigurationsRepository } from './configurations.repository';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class ConfigurationsService {
  constructor(
    private readonly configurationsRepository: ConfigurationsRepository,
  ) {}
  create(createConfigurationDto: CreateConfigurationDto) {
    return this.configurationsRepository.create(createConfigurationDto);
  }

  async findAll(
    filters?: Record<string, any>,
    limit?: number,
    offset?: number,
    page?: number,
    orderBy?: string,
    order?: 'asc' | 'desc'
  ): Promise<any[] | PaginatedResponse<any>> {
    const hasFilters = filters && Object.keys(filters).length > 0;
    const actualLimit = Number(limit) || 10;
    const actualOffset = page ? (Number(page) - 1) * actualLimit : (Number(offset) || 0);

    if (hasFilters || limit !== undefined || offset !== undefined || page !== undefined || orderBy !== undefined) {
      const { data, total } = await this.configurationsRepository.findAllFiltered(
        filters || {},
        actualLimit,
        actualOffset,
        orderBy,
        order
      );

      return {
        data,
        total,
        limit: actualLimit,
        ...(page ? { page } : { offset: actualOffset })
      };
    }

    return this.configurationsRepository.findAll();
  }

  findOne(name: string) {
    return this.configurationsRepository.findOne(name);
  }

  update(name: string, updateConfigurationDto: UpdateConfigurationDto) {
    return this.configurationsRepository.update(name, updateConfigurationDto);
  }

  remove(name: string) {
    return this.configurationsRepository.remove(name);
  }
}
