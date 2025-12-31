import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'The name of the user' })
  name: string;
  @IsString()
  @ApiProperty({ description: 'The email of the user' })
  email: string;
  @IsString()
  @ApiProperty({ description: 'The role id of the user' })
  roleId: string;

  @IsString()
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @IsOptional()
  @IsString()
  bankName: string;
  @IsOptional()
  @IsString()
  bankCode: string;
  @IsOptional()
  @IsString()
  agency: string;
  @IsOptional()
  @IsString()
  agencyDigit: string;
  @IsOptional()
  @IsString()
  accountNumber: string;
  @IsOptional()
  @IsString()
  accountDigit: string;
  @IsOptional()
  @IsString()
  accountType: string;

  @IsOptional()
  @IsArray()
  @Type(() => Configuration)
  configurations: Configuration[];
}

export class Configuration {
  @IsOptional()
  @IsNumber()
  id?: number;
  @IsString()
  @ApiProperty({ description: 'The name of the configuration' })
  name: string;
  @IsString()
  @ApiProperty({ description: 'The value of the configuration' })
  value: string;
}
