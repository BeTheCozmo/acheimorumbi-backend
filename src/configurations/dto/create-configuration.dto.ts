import { IsString } from "@nestjs/class-validator";

export class CreateConfigurationDto {
  @IsString()
  name: string;
  @IsString()
  value: string;
}
