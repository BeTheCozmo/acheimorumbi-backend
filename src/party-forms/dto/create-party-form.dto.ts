import { ApiProperty } from "@nestjs/swagger";
import { PartyFormType } from "../enums/party-form-type.enum";
import { IsEnum } from "@nestjs/class-validator";


export class CreatePartyFormDto {
  @ApiProperty({ enum: PartyFormType, enumName: "PartyFormType", description: "Type of party form" })
  @IsEnum(PartyFormType, { message: "Invalid party form type. Valid: SELLERS, BUYERS, LANDLORDS, TENANTS" })
  type: PartyFormType;
}
