import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChecklistItemDto } from './dto/create-checklist-item.dto';
import { UpdateChecklistItemDto } from './dto/update-checklist-item.dto';
import { ChecklistItemsRepository } from './checklist-items.repository';

@Injectable()
export class ChecklistItemsService {
  constructor(
    private readonly checklistItemsRepository: ChecklistItemsRepository,
  ) {}
  // create(createChecklistItemDto: CreateChecklistItemDto) {
  //   return 'This action adds a new checklistItem';
  // }

  // findAll() {
  //   return `This action returns all checklistItems`;
  // }

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
