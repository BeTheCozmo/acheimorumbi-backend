import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
  @ApiProperty({example: "ADMIN"})
  name: string;
  @ApiProperty()
  permissions: string[];
}
