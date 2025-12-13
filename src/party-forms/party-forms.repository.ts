import { Injectable } from "@nestjs/common";
import { CreatePartyFormDto } from "./dto/create-party-form.dto";
import { UpdatePartyFormDto } from "./dto/update-party-form.dto";
import { PartyFormType } from "./enums/party-form-type.enum";
import { PrismaService } from "@modules/prisma/prisma.service";
import { CreateFormAttributeDto } from "./dto/form-attribute.dto";

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
