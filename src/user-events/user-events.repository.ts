import { Injectable } from "@nestjs/common";
import { CreateUserEventDto } from "./dto/create-user-event.dto";
import { PrismaService } from "@modules/prisma/prisma.service";
import { UpdateUserEventDto } from "./dto/update-user-event.dto";
import { buildPrismaWhere, buildPrismaOrderBy, removeMode } from "src/common/utils/prisma-filter.util";
import { USER_EVENT_CONFIG } from "./user-events.filter-config";

@Injectable()
export class UserEventsRepository {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(createUserEventDto: CreateUserEventDto) {
    try {
      return await this.prismaService.userEvents.create({
        data: createUserEventDto,
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }
  async findAll() {
    try {
      return await this.prismaService.userEvents.findMany();
    } catch (error) {
      console.log({error});
      return [];
    }
  }

  async findAllFiltered(
    filters: Record<string, any>,
    limit: number,
    offset: number,
    orderBy?: string,
    order?: 'asc' | 'desc'
  ) {
    try {
      const where = buildPrismaWhere(filters, USER_EVENT_CONFIG.filterConfig);
      const orderByClause = buildPrismaOrderBy(orderBy, order, USER_EVENT_CONFIG.sortableFields);

      const [data, total] = await Promise.all([
        this.prismaService.userEvents.findMany({
          where,
          take: limit,
          skip: offset,
          orderBy: orderByClause,
        }),
        this.prismaService.userEvents.count({
          where: removeMode(where)
        }),
      ]);

      return { data, total };
    } catch (error) {
      console.log({ error });
      return { data: [], total: 0 };
    }
  }

  async findAllOfUser(id: number) {
    try {
      return await this.prismaService.userEvents.findMany({
        where: { userId: id },
      });
    } catch (error) {
      console.log({error});
      return [];
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.userEvents.findUnique({
        where: { id },
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async update(id: number, updateUserEventDto: UpdateUserEventDto) {
    try {
      return await this.prismaService.userEvents.update({
        where: { id },
        data: updateUserEventDto,
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.userEvents.delete({
        where: { id },
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }
}
