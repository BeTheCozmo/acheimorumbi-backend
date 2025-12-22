import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "@nestjs/class-validator";

export class ContractBankDto {
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
}