import { ApiProperty } from "@nestjs/swagger";

export class UserLoggedDto {
  @ApiProperty({ description: 'The id of the user' })
  id: string;
  @ApiProperty({ description: 'The name of the user' })
  name: string;
  @ApiProperty({ description: 'The email of the user' })
  email: string;
  @ApiProperty({ description: 'The role id of the user' })
  roleId: string;
  @ApiProperty({ description: 'The nickname of the user' })
  nickname: string;
}
