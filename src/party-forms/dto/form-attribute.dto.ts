import { PartyFormType } from "../enums/party-form-type.enum";
import { PartyFormAttributeType } from "../enums/party-form-type-attribute.enum";
import { IsBoolean, IsEnum, IsNumber, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FormAttribute {
  @IsString()
  @ApiProperty()
  name: string;
  @IsNumber()
  @ApiProperty()
  id: number;
  @IsEnum(PartyFormType)
  @ApiProperty()
  partyFormType: PartyFormType;
  @IsEnum(PartyFormAttributeType)
  @ApiProperty()
  type: PartyFormAttributeType;
  @IsString()
  @ApiProperty()
  title: string;
  @IsString()
  @ApiProperty()
  placeholder: string;
  @IsNumber()
  @ApiProperty()
  required: boolean;
  @IsNumber()
  @ApiProperty()
  order: number;
  @IsString()
  @ApiProperty()
  regexFormat: string;
  @IsString()
  @ApiProperty()
  default: string;
  @IsString()
  @ApiProperty()
  options: string;
  @IsString()
  @ApiProperty()
  createdAt: Date;
  @IsString()
  @ApiProperty()
  updatedAt: Date;
}

export class CreateFormAttributeDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsEnum(PartyFormType)
  @ApiProperty()
  partyFormType: PartyFormType;
  @IsEnum(PartyFormAttributeType)
  @ApiProperty()
  type: PartyFormAttributeType;
  @IsString()
  @ApiProperty()
  title: string;
  @IsString()
  @ApiProperty()
  placeholder: string;
  @IsBoolean()
  @ApiProperty()
  required: boolean;
  @IsNumber()
  @ApiProperty()
  order: number;
  @IsString()
  @ApiProperty()
  regexFormat: string;
  @IsString()
  @ApiProperty()
  default: string;
  @IsString()
  @ApiProperty()
  options: string;
}
