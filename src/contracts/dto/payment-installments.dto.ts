import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "@nestjs/class-validator"
import { PaymentInstallmentsType } from "@prisma/client"

export class PaymentInstallmentsDto {
  @IsOptional()
  @IsNumber()
  id?: number
  @IsEnum(() => PaymentInstallmentsType)
  type: PaymentInstallmentsType
  @IsOptional()
  @IsNumber()
  contractId?: number
  @IsNumber()
  value: number
  @IsDateString()
  dueDate: Date
  @IsBoolean()
  paid: boolean
  @IsDateString()
  paidAt: string //Date

  @IsOptional()
  @IsString()
  bankName: string
  @IsOptional()
  @IsString()
  bankCode: string
  @IsOptional()
  @IsString()
  agency: string
  @IsOptional()
  @IsString()
  agencyDigit: string
  @IsOptional()
  @IsString()
  accountNumber: string
  @IsOptional()
  @IsString()
  accountDigit: string
  @IsOptional()
  @IsString()
  accountType: string
}

// export enum PaymentInstallmentsType {
//   SIGNAL = "SIGNAL",
//   DOCUMENTATION = "DOCUMENTATION",
//   SIGNATURE = "SIGNATURE",
//   FGTS = "FGTS",
//   FINANCEMENT = "FINANCEMENT",
//   COMISSION = "COMISSION",
// }
