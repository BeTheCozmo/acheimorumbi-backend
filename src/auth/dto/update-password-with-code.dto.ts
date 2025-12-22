import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordWithCodeDto {
  @IsString()
  @ApiProperty()
  code: string;
  @IsString()
  @ApiProperty()
  password: string;
}
