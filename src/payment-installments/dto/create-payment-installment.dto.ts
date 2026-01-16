import { IsEnum, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentInstallmentsType } from "@prisma/client";

export class CreatePaymentInstallmentDto  {
	@ApiProperty()
	@IsEnum(PaymentInstallmentsType)
	type: PaymentInstallmentsType;
	@ApiProperty()
	@IsNumber()
	contractId: number;
	@ApiProperty()
	@IsNumber()
	value: number;
	@ApiProperty()
	@IsNumber()
	dueDate: Date;
	@ApiProperty()
	paid?: boolean;
	@ApiProperty()
	@IsNumber()
	paidAt?: Date;
	@ApiProperty()
	@IsOptional()
	@IsString()
	bankName?: string;
	@ApiProperty()
	@IsOptional()
	@IsString()
	bankCode?: string;
	@ApiProperty()
	@IsOptional()
	@IsString()
	agency?: string;
	@ApiProperty()
	@IsOptional()
	@IsString()
	agencyDigit?: string;
	@ApiProperty()
	@IsOptional()
	@IsString()
	accountNumber?: string;
	@ApiProperty()
	@IsOptional()
	@IsString()
	accountDigit?: string;
	@ApiProperty()
	@IsOptional()
	@IsString()
	accountType?: string;
}
