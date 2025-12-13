import { PrismaService } from "@modules/prisma/prisma.service";
import { Inject, Injectable } from "@nestjs/common";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";

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