import { PrismaService } from "@modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateChecklistItemDto } from "./dto/create-checklist-item.dto";
import { UpdateChecklistItemDto } from "./dto/update-checklist-item.dto";

@Injectable()
export class ChecklistItemsRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(checklistItem: CreateChecklistItemDto) {
    return this.prismaService.checklistItem.create({
      data: checklistItem,
    });
  }

  async findAll() {
    return this.prismaService.checklistItem.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.checklistItem.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, checklistItem: UpdateChecklistItemDto) {
    return this.prismaService.checklistItem.update({
      where: {
        id,
      },
      data: checklistItem,
    });
  }

  async remove(id: number) {
    return this.prismaService.checklistItem.delete({
      where: {
        id,
      },
    });
  }
}
