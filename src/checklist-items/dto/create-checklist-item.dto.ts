import { IsBoolean, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateChecklistItemDto {
  @IsString()
  title: string;
  @IsNumber()
  checklistTitleId: number;
  @IsString()
  @IsOptional()
  instructions?: string;
  @IsBoolean()
  checked: boolean;
  @IsNumber()
  order: number;
}
