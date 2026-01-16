import { Injectable } from "@nestjs/common";
import { CreatePartyFormDto } from "./dto/create-party-form.dto";
import { UpdatePartyFormDto } from "./dto/update-party-form.dto";
import { PartyFormType } from "./enums/party-form-type.enum";
import { PrismaService } from "@modules/prisma/prisma.service";
import { CreateFormAttributeDto } from "./dto/form-attribute.dto";
import { buildPrismaWhere, buildPrismaOrderBy, removeMode } from "src/common/utils/prisma-filter.util";
import { PARTY_FORM_CONFIG } from "./party-forms.filter-config";

@Injectable()
export class PartyFormsRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(createPartyFormDto: CreatePartyFormDto) {
    try {
      return await this.prismaService.partyForm.create({
        data: {type: createPartyFormDto.type},
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async addAttributeToForm(attribute: CreateFormAttributeDto) {
    try {
      return await this.prismaService.partyFormAttribute.create({
        data: attribute,
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.partyForm.findMany();
    } catch (error) {
      console.log({error});
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
      const where = buildPrismaWhere(filters, PARTY_FORM_CONFIG.filterConfig);
      const orderByClause = buildPrismaOrderBy(orderBy, order, PARTY_FORM_CONFIG.sortableFields);

      const [data, total] = await Promise.all([
        this.prismaService.partyForm.findMany({
          where,
          take: limit,
          skip: offset,
          orderBy: orderByClause,
        }),
        this.prismaService.partyForm.count({
          where: removeMode(where)
        }),
      ]);

      return { data, total };
    } catch (error) {
      console.log({ error });
      return { data: [], total: 0 };
    }
  }

  async findOne(type: PartyFormType) {
    try {
      return await this.prismaService.partyForm.findUnique({
        where: { type },
        include: {
          attributes: true,
        }
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async update(type: PartyFormType, updatePartyFormDto: UpdatePartyFormDto) {
    try {
      return await this.prismaService.partyForm.update({
        where: { type },
        data: updatePartyFormDto,
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async remove(type: PartyFormType) {
    try {
      return await this.prismaService.partyForm.delete({
        where: { type },
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }
}
