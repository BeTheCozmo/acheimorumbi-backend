import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";

@Injectable()
export class PropertiesRepository {
  @Inject() prismaService: PrismaService;

  async create(createPropertyDto: CreatePropertyDto) {
    try {
      return await this.prismaService.property.create({
        data: {
          ...createPropertyDto,
          name: createPropertyDto.name || "",
        }
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.property.findMany();
    } catch (error) {
      console.log({error});
      return [];
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.property.findUnique({
        where: {id}
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
        data: updatePropertyDto
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.property.delete({
        where: {id}
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }
}