import { PrismaService } from "@modules/prisma/prisma.service";
import { Inject, Injectable } from "@nestjs/common";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { buildPrismaWhere, buildPrismaOrderBy, removeMode } from "src/common/utils/prisma-filter.util";
import { DOCUMENT_CONFIG } from "./documents.filter-config";

@Injectable()
export class DocumentsRepository {
  @Inject() prismaService: PrismaService;

  async create(createDocumentDto: CreateDocumentDto) {
    try {
      return await this.prismaService.document.create({
        data: createDocumentDto,
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async findAll(contractId: number) {
    try {
      return await this.prismaService.document.findMany({
        where: { contractId },
      });
    } catch (error) {
      console.log({ error });
      return [];
    }
  }

  async findAllFiltered(
    contractId: number,
    filters: Record<string, any>,
    limit: number,
    offset: number,
    orderBy?: string,
    order?: 'asc' | 'desc'
  ) {
    try {
      const where = buildPrismaWhere({ ...filters, contractId }, DOCUMENT_CONFIG.filterConfig);
      const orderByClause = buildPrismaOrderBy(orderBy, order, DOCUMENT_CONFIG.sortableFields);

      const [data, total] = await Promise.all([
        this.prismaService.document.findMany({
          where,
          take: limit,
          skip: offset,
          orderBy: orderByClause,
        }),
        this.prismaService.document.count({
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
      return await this.prismaService.document.findUnique({
        where: { id },
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    try {
      return await this.prismaService.document.update({
        where: { id },
        data: updateDocumentDto,
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.document.delete({
        where: { id },
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
}