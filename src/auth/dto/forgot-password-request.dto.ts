import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
