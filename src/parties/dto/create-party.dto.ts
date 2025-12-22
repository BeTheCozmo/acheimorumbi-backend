import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import type { PartyInfo } from "./party-info.dto";
import { Type } from "class-transformer";
import { PropertyDto } from "@modules/properties/dto/property.dto";
import { ContractDto } from "@modules/contracts/dto/contract.dto";
import { ContractBankDto } from "./contract-bank-info.dto";

export class CreatePartyDataDto {
  @ApiProperty()
  @IsString()
  key: string;
  @ApiProperty()
  @IsString()
  value: string;
}

export class CreatePartyDto {
  @ApiProperty({ example: "AC-123" })
  @IsString()
  code: string;
  @ApiProperty({ description: "object that is configured in party form" })
  @IsArray()
  data: {[key: string]: string}[];
  @ApiProperty({ description: "additional Property Info" })
  @IsOptional()
  @Type(()=>PropertyDto)
  property?: PropertyDto;
  
  @ApiProperty({ description: "additional Contract Info" })
  @IsOptional()
  @Type(()=>ContractBankDto)
  contract?: ContractBankDto;

}
