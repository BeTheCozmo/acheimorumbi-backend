import { ApiProperty } from "@nestjs/swagger";
import { ContractType } from "../enums/contract-type";
import { IsArray, IsDate, IsDateString, IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from "@nestjs/class-validator";
import { ContractStatus } from "../enums/contract-status";
import { Type } from "class-transformer";
import { PaymentInstallmentsDto } from "./payment-installments.dto";

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

  @ApiProperty({description: "IDs dos corretores"})
  @IsOptional()
  @IsArray()
  @Type(() => Array<number>)
  realtors?: number[];

  @IsOptional()
  @IsString()
  guaranteeType?: string;
  @IsOptional()
  @IsDateString()
  leaseEndDate?: Date;
  @IsOptional()
  @IsDateString()
  leaseStartDate?: Date;
  @IsOptional()
  @IsNumber()
  rentDueDay?: number;

  @ApiProperty({ description: "Nome do banco para pagamento ao proprietário", example: "Banco do Brasil" })
  @IsOptional()
  @IsString()
  bankName?: string;

  @ApiProperty({ description: "Código do banco", example: "001" })
  @IsOptional()
  @IsString()
  bankCode?: string;

  @ApiProperty({ description: "Número da agência", example: "1234" })
  @IsOptional()
  @IsString()
  agency?: string;

  @ApiProperty({ description: "Dígito da agência", example: "5" })
  @IsOptional()
  @IsString()
  agencyDigit?: string;

  @ApiProperty({ description: "Número da conta", example: "12345678" })
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @ApiProperty({ description: "Dígito da conta", example: "9" })
  @IsOptional()
  @IsString()
  accountDigit?: string;

  @ApiProperty({ description: "Tipo da conta (Corrente, Poupança, etc)", example: "Corrente" })
  @IsOptional()
  @IsString()
  accountType?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Type(() => PaymentInstallmentsDto)
  paymentInstallments: PaymentInstallmentsDto[];
}
