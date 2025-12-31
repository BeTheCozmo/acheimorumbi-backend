import { IsOptional, IsString } from "@nestjs/class-validator";
import { Witness } from "@prisma/client";

export class CreateWitnessDto {
  @IsString()
  name: string;
  @IsString()
  rg: string;
  @IsOptional()
  signature?: string;
}
