import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from "@nestjs/class-validator";

export class CreateChecklistTitleDto {
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  instructions?: string;
  @IsNumber()
  contractId: number;
  @ValidateNested({ each: true })
  items: CreateChecklistItemDto[];
  @IsNumber()
  order: number;
}

export class CreateChecklistItemDto {
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  instructions?: string;
  @IsBoolean()
  checked: boolean;
  @IsNumber()
  order: number;
}
