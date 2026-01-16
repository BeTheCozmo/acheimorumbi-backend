import { Injectable } from '@nestjs/common';
import { CreateUserEventDto } from './dto/create-user-event.dto';
import { UpdateUserEventDto } from './dto/update-user-event.dto';
import { UserEventsRepository } from './user-events.repository';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class UserEventsService {
  constructor(
    private readonly userEventsRepository: UserEventsRepository,
  ) {}
  create(createUserEventDto: CreateUserEventDto) {
    return this.userEventsRepository.create(createUserEventDto);
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
      const { data, total } = await this.userEventsRepository.findAllFiltered(
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

    return this.userEventsRepository.findAll();
  }

  findAllOfUser(id: number) {
    return this.userEventsRepository.findAllOfUser(id);
  }

  findOne(id: number) {
    return this.userEventsRepository.findOne(id);
  }

  update(id: number, updateUserEventDto: UpdateUserEventDto) {
    return this.userEventsRepository.update(id, updateUserEventDto);
  }

  remove(id: number) {
    return this.userEventsRepository.remove(id);
  }
}
