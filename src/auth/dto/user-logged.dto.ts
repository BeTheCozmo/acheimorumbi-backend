import { RoleDto } from "src/roles/dto/role.dto";

export class UserLoggedDto {
  id: number;
  name: string;
  email: string;
  role: RoleDto;
  permissions: string[];
}
