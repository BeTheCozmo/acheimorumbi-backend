import { PrismaService } from "@modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreatePartyDto } from "./dto/create-party.dto";
import { UpdatePartyDto } from "./dto/update-party.dto";
import { Prisma } from "@prisma/client";
import { PartyType } from "./dto/party-type.dto";
import { buildPrismaWhere, buildPrismaOrderBy, removeMode } from "src/common/utils/prisma-filter.util";
import { PARTY_CONFIG } from "./parties.filter-config";

@Injectable()
export class PartiesRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }
  async create({ code, contractId, type, data }: { code: string, contractId: number, type: PartyType, data: { [key: string]: string }[] }) {
    try {
      console.log({ data });

      return await Promise.all(data.map((partyData) =>
        this.prismaService.party.create({
          data: {
            code,
            type,
            data: {
              createMany: {
                data: Object.keys(partyData).map(key => ({
                  key,
                  value: partyData[key]
                }))
              }
            },
            contractId
          }
        })));
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
  
  async findSubmitedFormByCode(code: string) {
    return await this.prismaService.party.findFirst({
      where: {
        code
      }
    });
  }

  async findAll() {
    try {
      return await this.prismaService.party.findMany();
    } catch (error) {
      console.log({ error });
      return null;
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
      const where = buildPrismaWhere(filters, PARTY_CONFIG.filterConfig);
      const orderByClause = buildPrismaOrderBy(orderBy, order, PARTY_CONFIG.sortableFields);

      const [data, total] = await Promise.all([
        this.prismaService.party.findMany({
          where,
          take: limit,
          skip: offset,
          orderBy: orderByClause,
        }),
        this.prismaService.party.count({
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
      return await this.prismaService.party.findUnique({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async findManyByCode(code: string) {
    try {
      return await this.prismaService.party.findMany({
        where: {code},
        include: {data: true}
      })
    } catch (error) {
      
    }
  }

  async update(id: number, updatePartyDto: Prisma.PartyUpdateArgs['data']) {
    try {
      return await this.prismaService.party.update({
        where: {
          id: id
        },
        data: updatePartyDto
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.party.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async findManyByContractId(contractId: number) {
    return await this.prismaService.party.findMany({
      where: {
        contractId
      },
      include: {
        data: true
      }
    });
  }
}
