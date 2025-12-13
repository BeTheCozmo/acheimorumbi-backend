import { ApiProperty } from "@nestjs/swagger";
import { PropertyType } from "../enums/property-type";

export class PropertyDto {
  @ApiProperty({example: 1})
  id: number;
  @ApiProperty({example: "123"})
  number: string;
  @ApiProperty({example: "Property Name"})
  name: string;
  @ApiProperty({example: "123456789"})
  externalId: string;
  @ApiProperty({example: "05433-080"})
  cep: string;
  @ApiProperty({example: "SP"})
  state: string;
  @ApiProperty({example: "São Paulo"})
  city: string;
  @ApiProperty({example: "Vila Madalena"})
  neighborhood: string;
  @ApiProperty({example: "Praça José Afonso de Almeida"})
  street: string;
  @ApiProperty({example: "123"})
  complement: string;
  @ApiProperty({enum: PropertyType, example: PropertyType.CONDOMINIUM})
  type: PropertyType;
  @ApiProperty({example: "A"})
  block: string;
  @ApiProperty({example: "2"})
  unity: string;
  @ApiProperty({example: "Registro de Imóveis de São Paulo/SP"})
  registryOffice: string;
  @ApiProperty({example: "0012345"})
  registrationNumber: string;
  @ApiProperty({example: "50m²"})
  area: string;
  @ApiProperty({example: "2"})
  parkingSpaces: string;
  @ApiProperty({example: "1"})
  suites: string;
  @ApiProperty({example: "1"})
  floorLevel: string;
  @ApiProperty({example: "Imóvel pendente de regularização"})
  observations: string;
}
