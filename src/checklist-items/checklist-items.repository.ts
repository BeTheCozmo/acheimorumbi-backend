import { PrismaService } from "@modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateChecklistItemDto } from "./dto/create-checklist-item.dto";
import { UpdateChecklistItemDto } from "./dto/update-checklist-item.dto";
import { buildPrismaWhere, buildPrismaOrderBy, removeMode } from "src/common/utils/prisma-filter.util";
import { CHECKLIST_ITEM_CONFIG } from "./checklist-items.filter-config";

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

  async findAllFiltered(
    filters: Record<string, any>,
    limit: number,
    offset: number,
    orderBy?: string,
    order?: 'asc' | 'desc'
  ) {
    try {
      const where = buildPrismaWhere(filters, CHECKLIST_ITEM_CONFIG.filterConfig);
      const orderByClause = buildPrismaOrderBy(orderBy, order, CHECKLIST_ITEM_CONFIG.sortableFields);

      const [data, total] = await Promise.all([
        this.prismaService.checklistItem.findMany({
          where,
          take: limit,
          skip: offset,
          orderBy: orderByClause,
        }),
        this.prismaService.checklistItem.count({
          where: removeMode(where)
        }),
      ]);

      return { data, total };
    } catch (error) {
      console.log({ error });
      return { data: [], total: 0 };
    }
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
