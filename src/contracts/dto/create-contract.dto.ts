import { ApiProperty } from "@nestjs/swagger";
import { ContractType } from "../enums/contract-type";
import { IsEnum, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { ContractStatus } from "../enums/contract-status";

export class CreateContractDto {
  @ApiProperty()
  @IsNumber()
  propertyId: number;

  @ApiProperty()
  @IsEnum(ContractType)
  type: ContractType;

  @ApiProperty()
  @IsEnum(ContractStatus)
  @IsOptional()
  status?: ContractStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  acquirerCode?: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  ownerCode?: string;

  @ApiProperty()
  @IsNumber()
  value: number;
}
