import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { PropertyType } from "../enums/property-type";
import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Property } from "@prisma/client";
import { PropertyStatus } from "../enums/property-status";

export class CreatePropertyDto {
  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Property address name'})
  name?: string;

  @IsString()
  @ApiProperty({description: 'Property external id'})
  externalId: string;

  @IsString()
  @ApiProperty({description: 'Property cep'})
  cep: string;

  @IsString()
  @ApiProperty({description: 'Property address number'})
  number: string;

  @IsString()
  @ApiProperty({description: 'Property state'})
  state: string;

  @IsString()
  @ApiProperty({description: 'Property city'})
  city: string;

  @IsString()
  @ApiProperty({description: 'Property neighborhood'})
  neighborhood: string;

  @IsString()
  @ApiProperty({description: 'Property street'})
  street: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Property complement'})
  complement?: string;

  @IsEnum(PropertyType)
  @ApiProperty({description: 'Property type'})
  type: PropertyType;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Condominium block'})
  block?: string;
  
  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Condominium unity'})
  unity?: string;
  
  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Condominium name'})
  condominium?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({description: 'Condominium value'})
  condominiumValue?: number;
  
  @IsNumber()
  @IsOptional()
  @ApiProperty({description: 'IPTU value'})
  iptuValue?: number;

  @IsString()
  @ApiProperty({description: 'Property registry office'})
  registryOffice: string;

  @IsString()
  @ApiProperty({description: 'Property registration number'})
  registrationNumber: string;

  @IsString()
  @ApiProperty({description: 'Property area'})
  area: string;

  @IsString()
  @ApiProperty({description: 'Property parking spaces'})
  parkingSpaces: string;

  @IsString()
  @ApiProperty({description: 'Property floor level'})
  floorLevel: string;

  @IsString()
  @ApiProperty({description: 'Property observations'})
  observations: string;

  @IsEnum(PropertyStatus)
  @ApiProperty()
  status: PropertyStatus;

  @IsDateString()
  @ApiProperty()
  statusDate: Date;

  @IsString()
  @ApiProperty()
  statusRegistry: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  alienatedBank: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  alienationRegistry: string;

  @IsOptional()
  @IsString()
  registryOfficeCity?: string;
  
  @IsBoolean()
  @ApiProperty()
  registeredWithAnotherOwner: boolean;
  
  @IsDateString()
  @ApiProperty()
  acquiredDate: Date;
  
  @IsString()
  @ApiProperty()
  acquiredRegistry: string;
  
  @IsString()
  @ApiProperty()
  taxPayerNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  electricityRegistration?: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  waterRegistration?: string;
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isWaterIndividual: boolean;
  @IsString()
  @IsOptional()
  @ApiProperty()
  gasRegistration?: string;
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isGasIndividual: boolean;
}
