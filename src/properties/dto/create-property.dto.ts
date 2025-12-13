import { IsOptional, IsString } from "@nestjs/class-validator";
import { PropertyType } from "../enums/property-type";
import { ApiProperty } from "@nestjs/swagger";

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

  @IsString()
  @ApiProperty({description: 'Property type'})
  type: PropertyType;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Property block'})
  block?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({description: 'Property unity'})
  unity?: string;

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
  @ApiProperty({description: 'Property suites'})
  suites: string;

  @IsString()
  @ApiProperty({description: 'Property floor level'})
  floorLevel: string;

  @IsString()
  @ApiProperty({description: 'Property observations'})
  observations: string;
}