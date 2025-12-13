import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user';
import { seedPermissions } from './permissions';
import { seedRoles } from './roles';
import { seedProperties } from './properties';
import { seedContracts } from './contracts';
import { seedPartyForm } from './partyform';
import { seedPartyFormAttributes } from './partyform-attributes';

const prisma = new PrismaClient();
async function main() {
  const permissions = await seedPermissions(prisma);
  const roles = await seedRoles(prisma);
  const users = await seedUsers(prisma);
  const property = await seedProperties(prisma);
  const contract = await seedContracts(prisma, property);
  const partyForm = await seedPartyForm(prisma);
  const partyFormAttributes = await seedPartyFormAttributes(prisma);
}

main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async() => {
  await prisma.$disconnect();
});
