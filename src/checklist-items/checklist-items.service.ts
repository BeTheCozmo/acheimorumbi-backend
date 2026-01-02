import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChecklistItemDto } from './dto/create-checklist-item.dto';
import { UpdateChecklistItemDto } from './dto/update-checklist-item.dto';
import { ChecklistItemsRepository } from './checklist-items.repository';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class ChecklistItemsService {
  constructor(
    private readonly checklistItemsRepository: ChecklistItemsRepository,
  ) {}
  // create(createChecklistItemDto: CreateChecklistItemDto) {
  //   return 'This action adds a new checklistItem';
  // }

  async findAll(filters?: Record<string, any>, limit?: number, offset?: number, page?: number): Promise<any[] | PaginatedResponse<any>> {
    const hasFilters = filters && Object.keys(filters).length > 0;
    const actualLimit = Number(limit) || 10;
    const actualOffset = page ? (Number(page) - 1) * actualLimit : (Number(offset) || 0);

    if (hasFilters || limit !== undefined || offset !== undefined || page !== undefined) {
      const { data, total } = await this.checklistItemsRepository.findAllFiltered(filters || {}, actualLimit, actualOffset);

      return {
        data,
        total,
        limit: actualLimit,
        ...(page ? { page } : { offset: actualOffset })
      };
    }

    return this.checklistItemsRepository.findAll();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} checklistItem`;
  // }

  // update(id: number, updateChecklistItemDto: UpdateChecklistItemDto) {
  //   return `This action updates a #${id} checklistItem`;
  // }

  async toggleChecked(id: number) {
    const checklistItem = await this.checklistItemsRepository.findOne(id);
    if(!checklistItem) throw new HttpException('Checklist item not found', HttpStatus.NOT_FOUND);
    return await this.checklistItemsRepository.update(id, {checked: !checklistItem.checked});
  }

  // remove(id: number) {
  //   return `This action removes a #${id} checklistItem`;
  // }
}
