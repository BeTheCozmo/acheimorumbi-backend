import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";
import { buildPrismaWhere, buildPrismaOrderBy, removeMode } from "src/common/utils/prisma-filter.util";
import { PROPERTY_CONFIG } from "./properties.filter-config";

@Injectable()
export class PropertiesRepository {
  @Inject() prismaService: PrismaService;

  async create(createPropertyDto: CreatePropertyDto) {
    try {
      return await this.prismaService.property.create({
        data: {
          ...createPropertyDto,
          name: createPropertyDto.name || "",
          statusDate: createPropertyDto.statusDate ? new Date(createPropertyDto.statusDate) : null,
          acquiredDate: createPropertyDto.acquiredDate ? new Date(createPropertyDto.acquiredDate) : null
        },
        include: {referrer: true}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.property.findMany({include: {referrer: true}});
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
      const where = buildPrismaWhere(filters, PROPERTY_CONFIG.filterConfig);
      const orderByClause = buildPrismaOrderBy(orderBy, order, PROPERTY_CONFIG.sortableFields);

      const [data, total] = await Promise.all([
        this.prismaService.property.findMany({
          where,
          include: {referrer: true},
          take: limit,
          skip: offset,
          orderBy: orderByClause,
        }),
        this.prismaService.property.count({
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
      return await this.prismaService.property.findUnique({
        where: {id},
        include: {referrer: true}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    try {
      return await this.prismaService.property.update({
        where: {id},
        data: {
          ...updatePropertyDto,
          statusDate: updatePropertyDto.statusDate ? new Date(updatePropertyDto.statusDate) : null,
          acquiredDate: updatePropertyDto.acquiredDate ? new Date(updatePropertyDto.acquiredDate) : null,
        },
        include: {referrer: true}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.property.delete({
        where: {id},
        include: {referrer: true}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }
}