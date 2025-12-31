import { PrismaService } from "@modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateWitnessDto } from "./dto/create-witness.dto";
import { UpdateWitnessDto } from "./dto/update-witness.dto";

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