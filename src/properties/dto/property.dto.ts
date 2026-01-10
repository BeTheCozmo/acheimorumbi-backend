import { ApiProperty } from "@nestjs/swagger";
import { PropertyType } from "../enums/property-type";
import { PropertyStatus } from "../enums/property-status";
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from "@nestjs/class-validator";

export class PropertyDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;
  
  @ApiProperty({ example: "123" })
  @IsNumberString()
  number: string;
  
  @ApiProperty({ example: "Property Name" })
  @IsString()
  name: string;
  
  @ApiProperty({ example: "123456789" })
  @IsString()
  @IsOptional()
  externalId: string;

  @ApiProperty({ example: "05433-080" })
  @IsString()
  cep: string;

  @ApiProperty({ example: "SP" })
  @IsString()
  state: string;

  @ApiProperty({ example: "São Paulo" })
  @IsString()
  city: string;

  @ApiProperty({ example: "Vila Madalena" })
  @IsString()
  neighborhood: string;

  @ApiProperty({ example: "Praça José Afonso de Almeida" })
  @IsString()
  street: string;

  @ApiProperty({ example: "123" })
  @IsOptional()
  @IsString()
  complement: string;

  @ApiProperty({ enum: PropertyType, example: PropertyType.CONDOMINIUM_HOUSE })
  @IsEnum(PropertyType)
  type: PropertyType;

  @ApiProperty({ example: 'Águas Diamantinas' })
  @IsString()
  condominium: string;

  @ApiProperty({ example: "A" })
  @IsString()
  block: string;

  @ApiProperty({ example: "2" })
  @IsString()
  unity: string;

  @ApiProperty({ example: "Registro de Imóveis de São Paulo/SP" })
  @IsString()
  registryOffice: string;

  @ApiProperty({ example: "0012345" })
  @IsString()
  registrationNumber: string;

  @ApiProperty({ example: "50m²" })
  @IsString()
  area: string;

  @ApiProperty({ example: "2" })
  @IsString()
  parkingSpaces: string;

  @ApiProperty({ example: "1" })
  @IsString()
  floorLevel: string;

  @ApiProperty({ example: "Imóvel pendente de regularização" })
  @IsString()
  observations: string;

  @ApiProperty({ description: "Status da propriedade (PAID_OFF, FINANCED)", example: PropertyStatus.FINANCED})
  @IsEnum(PropertyStatus)
  status: PropertyStatus;

  @ApiProperty({ description: "Data do Status", example: new Date()})
  statusDate: string;

  @ApiProperty({ description: "Nº do Registro do Status "})
  @IsString()
  statusRegistry: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  alienatedBank: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  alienationRegistry: string;

  @ApiProperty({ example: 1500.00 })
  @IsNumber()
  @IsOptional()
  condominiumValue?: number;

  @ApiProperty({ example: 800.00 })
  @IsNumber()
  @IsOptional()
  iptuValue?: number;

  @ApiProperty({ description: "Cidade do registro de imóveis", example: "São Paulo"})
  @IsString()
  @IsOptional()
  registryOfficeCity?: string;

  @ApiProperty({ description: "Se a posse do imóvel está em nome de outra pessoa na matrícula", example: false})
  @IsBoolean()
  registeredWithAnotherOwner: boolean;

  @ApiProperty({ description: "Data de adquirimento segundo a matrícula" })
  @IsDateString()
  acquiredDate: string;

  @ApiProperty({ description: "Número no registro que prova o adquirimento por parte dos donos do imóvel", example: "registro123456" })
  @IsString()
  acquiredRegistry: string;

  @ApiProperty({ description: "Número do contribuinte", example: "123 456 789" })
  @IsString()
  taxPayerNumber: string;

  @ApiProperty({ description: "Número de registro da conta de luz", example: "123456789" })
  @IsString()
  @IsOptional()
  electricityRegistration?: string;

  @ApiProperty({ description: "Número de registro da conta de água", example: "987654321" })
  @IsString()
  @IsOptional()
  waterRegistration?: string;

  @ApiProperty({ description: "Se o registro de água é individual", example: true })
  @IsBoolean()
  isWaterIndividual: boolean;

  @ApiProperty({ description: "Número de registro da conta de gás", example: "456789123" })
  @IsString()
  @IsOptional()
  gasRegistration?: string;

  @ApiProperty({ description: "Se o registro de gás é individual", example: true })
  @IsBoolean()
  isGasIndividual: boolean;
}
