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
  @Type(() => Object)
  configurations: {[key: string]: string}[];
}
