import { IsNumber, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserByAuthDto {
  @IsString()
  @ApiProperty({ description: 'The name of the user' })
  name: string;
  @IsString()
  @ApiProperty({ description: 'The email of the user' })
  email: string;
  @IsString()
  @ApiProperty({ description: 'The password of the user' })
  password: string;
  @IsNumber()
  @ApiProperty({ description: 'The role id of the user' })
  roleId: string;
}