import { Injectable } from "@nestjs/common";
import { CreateUserEventDto } from "./dto/create-user-event.dto";
import { PrismaService } from "@modules/prisma/prisma.service";
import { UpdateUserEventDto } from "./dto/update-user-event.dto";

@Injectable()
export class UserEventsRepository {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(createUserEventDto: CreateUserEventDto) {
    try {
      return await this.prismaService.userEvents.create({
        data: createUserEventDto,
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }
  async findAll() {
    try {
      return await this.prismaService.userEvents.findMany();
    } catch (error) {
      console.log({error});
      return [];
    }
  }

  async findAllOfUser(id: number) {
    try {
      return await this.prismaService.userEvents.findMany({
        where: { userId: id },
      });
    } catch (error) {
      console.log({error});
      return [];
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.userEvents.findUnique({
        where: { id },
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async update(id: number, updateUserEventDto: UpdateUserEventDto) {
    try {
      return await this.prismaService.userEvents.update({
        where: { id },
        data: updateUserEventDto,
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.userEvents.delete({
        where: { id },
      });
    } catch (error) {
      console.log({error});
      return null;
    }
  }
}
