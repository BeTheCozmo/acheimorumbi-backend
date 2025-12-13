import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the permission' })
  name: string
}
