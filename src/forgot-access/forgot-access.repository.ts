import { Injectable } from "@nestjs/common";
import { CreateForgotAccessRequestDto } from "./dto/create-forgot-acess-request.dto";
import { PrismaService } from "@modules/prisma/prisma.service";

@Injectable()
export class ForgotAccessRepository {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }
  async makeRequest({ userId, code, expiresAt }: CreateForgotAccessRequestDto) {
    return await this.prismaService.forgotAccessCode.create({
      data: {
        code,
        userId,
        expiresAt,
      }
    })
  }

  async findOne(code: string) {
    try {
      return await this.prismaService.forgotAccessCode.findUnique({
        where: {
          code,
        }
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async setUsed(code: string) {
    try {
      return await this.prismaService.forgotAccessCode.update({
        where: {
          code,
        },
        data: {
          used: true,
          usedAt: new Date(),
        }
      });
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
}