import { PrismaService } from "@modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateWitnessDto } from "./dto/create-witness.dto";
import { UpdateWitnessDto } from "./dto/update-witness.dto";
import { buildPrismaWhere, buildPrismaOrderBy, removeMode } from "src/common/utils/prisma-filter.util";
import { WITNESS_CONFIG } from "./witnesses.filter-config";

@Injectable()
export class WitnessesRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(createWitnessDto: CreateWitnessDto) {
    try {
      return await this.prismaService.witness.create({
        data: createWitnessDto
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.witness.findMany();
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
      const where = buildPrismaWhere(filters, WITNESS_CONFIG.filterConfig);
      const orderByClause = buildPrismaOrderBy(orderBy, order, WITNESS_CONFIG.sortableFields);

      const [data, total] = await Promise.all([
        this.prismaService.witness.findMany({
          where,
          take: limit,
          skip: offset,
          orderBy: orderByClause,
        }),
        this.prismaService.witness.count({
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
    try {
      return await this.prismaService.witness.findFirst({
        where: { id }
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async update(id: number, updateWitnessDto: UpdateWitnessDto) {
    try {
      return await this.prismaService.witness.update({
        where: { id },
        data: updateWitnessDto
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.witness.delete({
        where: { id }
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }
}