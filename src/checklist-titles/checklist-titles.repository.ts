import { PrismaService } from "@modules/prisma/prisma.service";
import { Inject, Injectable } from "@nestjs/common";
import { CreateChecklistTitleDto } from "./dto/create-checklist-title.dto";
import { UpdateChecklistTitleDto } from "./dto/update-checklist-title.dto";

@Injectable()
export class ChecklistTitlesRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(checklistTitle: CreateChecklistTitleDto) {
    try {
      return await this.prismaService.checklistTitle.create({
        data: {
          title: checklistTitle.title,
          instructions: checklistTitle.instructions,
          contractId: checklistTitle.contractId,
          order: checklistTitle.order,
          checklistItems: {
            create: checklistTitle.items,
          },
        },
        include: {checklistItems: true}
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.checklistTitle.findMany({
        include: {checklistItems: true}
      });
    } catch (error) {
      console.log({ error });
      return [];
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.checklistTitle.findUnique({
        where: {
          id: id,
        },
        include: {checklistItems: true}
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async update(id: number, updateChecklistTitleDto: UpdateChecklistTitleDto) {
    try {
      return await this.prismaService.checklistTitle.update({
        where: { id },
        data: updateChecklistTitleDto,
        include: {checklistItems: true}
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.checklistTitle.delete({
        where: {
          id: id,
        },
        include: {checklistItems: true}
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
}
