import { Inject, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesRepository } from './properties.repository';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class PropertiesService {
  @Inject() propertiesRepository: PropertiesRepository;
  private readonly optionalFields: (keyof CreatePropertyDto)[] = [
    'block', 'alienatedBank', 'complement', 'condominium',
    'waterRegistration', 'electricityRegistration', 'gasRegistration',
    'condominiumValue', 'iptuValue', 'floorLevel', 'observations',
  ];
  create(createPropertyDto: CreatePropertyDto) {
    return this.propertiesRepository.create(createPropertyDto);
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
      const { data, total } = await this.propertiesRepository.findAllFiltered(
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

    return this.propertiesRepository.findAll();
  }

  findOne(id: number) {
    return this.propertiesRepository.findOne(id);
  }

  async checkPropertyFullFilled(id: number) {
    const property = await this.findOne(id);
    const fields = Object.keys(property).filter(key => property[key] === null || property[key] === undefined);
    const fieldsNotFilled = fields.filter(field => !this.optionalFields.includes(field as keyof CreatePropertyDto));
    const isPropertyFullFilled = fieldsNotFilled.length === 0;
    return {
      isPropertyFullFilled,
      fieldsNotFilled,
    };
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesRepository.update(id, updatePropertyDto);
  }

  remove(id: number) {
    return this.propertiesRepository.remove(id);
  }
}
