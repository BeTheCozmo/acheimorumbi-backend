import { IsEnum, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'The name of the user' })
  name: string;
  @IsString()
  @ApiProperty({ description: 'The email of the user' })
  email: string;
  @IsNumber()
  @ApiProperty({ description: 'The role id of the user' })
  roleId: string;
}
