import { ApiProperty } from "@nestjs/swagger";

export class PermissionDto {
  @ApiProperty({ description: 'The name of the permission' })
  name: string;
}