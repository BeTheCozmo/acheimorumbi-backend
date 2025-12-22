import { $Enums, Contract } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { UserDto } from "@modules/users/dto/user.dto";

export class ContractDto {
  @ApiProperty({ description: "ID do contrato", example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: "ID da propriedade", example: 1 })
  @IsNumber()
  propertyId: number;

  @ApiProperty({ description: "Código do proprietário", example: "OWN-123456" })
  @IsString()
  ownerCode: string;

  @ApiProperty({ description: "Código do adquirente", example: "ACQ-123456" })
  @IsString()
  acquirerCode: string;

  @ApiProperty({ description: "Valor do contrato", example: 350000.00 })
  @IsNumber()
  value: number;

  @ApiProperty({ description: "Lista de corretores envolvidos", isArray: true })
  @IsArray()
  realtors: UserDto[];

  @ApiProperty({ description: "Status do contrato", enum: $Enums.ContractStatus, example: "PENDING" })
  @IsEnum($Enums.ContractStatus)
  status: $Enums.ContractStatus;

  @ApiProperty({ description: "Tipo do contrato", enum: $Enums.ContractType, example: "SALE" })
  @IsEnum($Enums.ContractType)
  type: $Enums.ContractType;

  @ApiProperty({ description: "Tipo de garantia (para contratos de locação)", example: "Fiador", required: false })
  @IsString()
  @IsOptional()
  guaranteeType: string;

  @ApiProperty({ description: "Data de início do aluguel (para contratos de locação)", required: false })
  @IsDateString()
  @IsOptional()
  leaseStartDate: Date;

  @ApiProperty({ description: "Data de término do aluguel (para contratos de locação)", required: false })
  @IsDateString()
  @IsOptional()
  leaseEndDate: Date;

  @ApiProperty({ description: "Dia de vencimento do aluguel (para contratos de locação)", example: 10, required: false })
  @IsNumber()
  @IsOptional()
  rentDueDay: number;

  @ApiProperty({ description: "Nome do banco para pagamento ao proprietário", example: "Banco do Brasil", required: false })
  @IsString()
  @IsOptional()
  bankName?: string;

  @ApiProperty({ description: "Código do banco", example: "001", required: false })
  @IsString()
  @IsOptional()
  bankCode?: string;

  @ApiProperty({ description: "Número da agência", example: "1234", required: false })
  @IsString()
  @IsOptional()
  agency?: string;

  @ApiProperty({ description: "Dígito da agência", example: "5", required: false })
  @IsString()
  @IsOptional()
  agencyDigit?: string;

  @ApiProperty({ description: "Número da conta", example: "12345678", required: false })
  @IsString()
  @IsOptional()
  accountNumber?: string;

  @ApiProperty({ description: "Dígito da conta", example: "9", required: false })
  @IsString()
  @IsOptional()
  accountDigit?: string;

  @ApiProperty({ description: "Tipo da conta (Corrente, Poupança, etc)", example: "Corrente", required: false })
  @IsString()
  @IsOptional()
  accountType?: string;

  @ApiProperty({ description: "Data de criação do contrato" })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ description: "Data de atualização do contrato" })
  @IsDateString()
  updatedAt: Date;
}