import { Injectable } from "@nestjs/common";
import { Validator } from '@modules/permissions/permissions.decorator';
import { permissionsValidator } from '@modules/permissions/validator/permissions.validator';
import { PrismaService } from "@modules/prisma/prisma.service";
import { CreateConfigurationDto } from "./dto/create-configuration.dto";
import { UpdateConfigurationDto } from "./dto/update-configuration.dto";
import { buildPrismaWhere, buildPrismaOrderBy, removeMode } from "src/common/utils/prisma-filter.util";
import { CONFIGURATION_CONFIG } from "./configurations.filter-config";

@Injectable()
export class ConfigurationsRepository {
  constructor(
    private prismaService: PrismaService,
  ) {}

  create(createConfigurationDto: CreateConfigurationDto) {
    return this.prismaService.configuration.create({
      data: {
        name: createConfigurationDto.name,
        value: createConfigurationDto.value,
      },
    });
  }

  findAll() {
    return this.prismaService.configuration.findMany();
  }

  async findAllFiltered(
    filters: Record<string, any>,
    limit: number,
    offset: number,
    orderBy?: string,
    order?: 'asc' | 'desc'
  ) {
    try {
      const where = buildPrismaWhere(filters, CONFIGURATION_CONFIG.filterConfig);
      const orderByClause = buildPrismaOrderBy(orderBy, order, CONFIGURATION_CONFIG.sortableFields);

      const [data, total] = await Promise.all([
        this.prismaService.configuration.findMany({
          where,
          take: limit,
          skip: offset,
          orderBy: orderByClause,
        }),
        this.prismaService.configuration.count({
          where: removeMode(where)
        }),
      ]);

      return { data, total };
    } catch (error) {
      console.log({ error });
      return { data: [], total: 0 };
    }
  }

  findOne(name: string) {
    return this.prismaService.configuration.findUnique({
      where: {
        name,
      },
    });
  }

  update(name: string, updateConfigurationDto: UpdateConfigurationDto) {
    return this.prismaService.configuration.update({
      where: {
        name,
      },
      data: {
        name: updateConfigurationDto.name,
        value: updateConfigurationDto.value,
      },
    });
  }

  remove(name: string) {
    return this.prismaService.configuration.delete({
      where: {
        name,
      },
    });
  }
}
