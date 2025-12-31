import { IsArray, IsNumber, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Configuration, CreateUserDto } from "./create-user.dto";
import { Type } from "class-transformer";

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

  @ApiProperty({ description: 'The configurations of the user' })
  @IsArray()
  @Type(() => Array<Configuration>)
  configurations: Configuration[]
}
