import { IsArray, IsNotEmpty, IsObject, IsString, ValidateNested } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import type { PartyInfo } from "./party-info.dto";
import { Type } from "class-transformer";

export class CreatePartyDataDto {
  @ApiProperty()
  @IsString()
  key: string;
  @ApiProperty()
  @IsString()
  value: string;
}

export class CreatePartyDto {
  @ApiProperty({ example: "AC-123" })
  @IsString()
  code: string;
  @ApiProperty({ description: "object that is configured in party form" })
  @IsArray()
  data: {[key: string]: string}[];
}
