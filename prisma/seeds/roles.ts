import { PrismaClient, Role } from "@prisma/client";
import { commonUserPermissions, masterPermissions } from "./permissions";

export async function seedRoles(prisma: PrismaClient) {
  const roles = ['USER', 'MASTER'];
  const masterRole = await prisma.role.create({
    data: {
      name: 'MASTER',
      permissions: {
        connect: masterPermissions.map(permission => ({ name: permission }))
      }
    }
  });

  const commonUserRole = await prisma.role.create({
    data: {
      name: 'USER',
      permissions: {
        connect: commonUserPermissions.map(permission => ({ name: permission }))
      }
    }
  });
  return roles;
}
