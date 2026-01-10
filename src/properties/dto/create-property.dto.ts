import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
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
  @IsOptional()
  @ApiProperty({description: 'Property external id'})
  externalId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'Property cep'})
  cep: string;

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'Property address number'})
  number: string;

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'Property state'})
  state: string;

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'Property city'})
  city: string;

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'Property neighborhood'})
  neighborhood: string;

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'Property street'})
  street: string;

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'Property complement'})
  complement?: string;

  @IsOptional()
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
  @IsOptional()
  @ApiProperty({description: 'Property registry office'})
  registryOffice?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Property registration number'})
  registrationNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Property area'})
  area?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Property parking spaces'})
  parkingSpaces?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Property floor level'})
  floorLevel?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Property observations'})
  observations?: string;

  @IsOptional()
  @IsEnum(PropertyStatus)
  @ApiProperty()
  status: PropertyStatus;

  @IsOptional()
  @IsString()
  @ApiProperty()
  statusDate: string;

  @IsOptional()
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
  @IsOptional()
  @IsString()
  registryOfficeCity?: string;
  
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  registeredWithAnotherOwner: boolean;
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  acquiredDate: string;
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  acquiredRegistry: string;
  
  @IsOptional()
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

  @ApiProperty()
  @IsNumber()
  referrerId: number;
}
