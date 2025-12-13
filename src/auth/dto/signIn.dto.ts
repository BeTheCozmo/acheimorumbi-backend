import { IsEmail, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  password: string;
}