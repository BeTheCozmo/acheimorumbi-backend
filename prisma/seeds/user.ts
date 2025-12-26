
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { masterPermissions, commonUserPermissions } from './permissions';

export async function seedUsers(prisma: PrismaClient) {

  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@getnada.com',
      password: bcrypt.hashSync('123456789', 13),
      permissions: {
        connect: [
          ...masterPermissions.map(permission => ({ name: permission })),
        ],
      },
      configurations: {
        createMany: {data: [{name: 'porcentagemCaptacao', value: "5"}, {name: 'porcentagemCorretagem', value: "40"}]}
      },
      roleId: 'MASTER',
    },
  })
  return {
    admin,
  }
}
