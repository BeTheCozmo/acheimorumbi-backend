import { ApiProperty } from "@nestjs/swagger";
import { RoleDto } from "src/roles/dto/role.dto";

export class UserDto {
  @ApiProperty({ description: 'The id of the user', example: 1 })
  id: number;
  @ApiProperty({ description: 'The name of the user', example: "John Doe" })
  name: string;
  @ApiProperty({ description: 'The email of the user', example: "john.doe@example.com" })
  email: string;
  @ApiProperty({ description: 'The role id of the user', type: RoleDto })
  role: RoleDto;
}

export class UserWithoutSectorsDto {
  @ApiProperty({ description: 'The id of the user', example: 1 })
  id: number;
  @ApiProperty({ description: 'The name of the user', example: "John Doe" })
  name: string;
  @ApiProperty({ description: 'The email of the user', example: "john.doe@example.com" })
  email: string;
  @ApiProperty({ description: 'The role id of the user', type: RoleDto })
  role: RoleDto;
}
