import { PrismaClient } from "@prisma/client";

export const masterPermissions = [
  "permissions:*:create",
  "permissions:*:read",
  "permissions:*:update",
  "permissions:*:delete",

  "roles:*:create",
  "roles:*:read",
  "roles:*:update",
  "roles:*:delete",

  "users:*:create",
  "users:*:read",
  "users:*:update",
  "users:*:delete",

  "contracts:*:create",
  "contracts:*:read",
  "contracts:*:update",
  "contracts:*:delete",

  "contracts:*:documents:*:create",
  "contracts:*:documents:*:read",
  "contracts:*:documents:*:update",
  "contracts:*:documents:*:delete",

  "contracts:*:parties:*:create",
  "contracts:*:parties:*:read",
  "contracts:*:parties:*:update",
  "contracts:*:parties:*:delete",

  "contracts:*:parties:*:info:*:create",
  "contracts:*:parties:*:info:*:read",
  "contracts:*:parties:*:info:*:update",
  "contracts:*:parties:*:info:*:delete",

  "contracts:*:checklist-titles:*:create",
  "contracts:*:checklist-titles:*:read",
  "contracts:*:checklist-titles:*:update",
  "contracts:*:checklist-titles:*:delete",

  "contracts:*:checklist-items:*:create",
  "contracts:*:checklist-items:*:read",
  "contracts:*:checklist-items:*:update",
  "contracts:*:checklist-items:*:delete",

  "properties:*:create",
  "properties:*:read",
  "properties:*:update",
  "properties:*:delete",

  "party-forms:*:create",
  "party-forms:*:read",
  "party-forms:*:update",
  "party-forms:*:delete",

  "party-forms-attributes:*:create",
  "party-forms-attributes:*:read",
  "party-forms-attributes:*:update",
  "party-forms-attributes:*:delete",

  "user-events:*:create",
  "user-events:*:read",
  "user-events:*:update",
  "user-events:*:delete",

  "configurations:*:create",
  "configurations:*:read",
  "configurations:*:update",
  "configurations:*:delete",

  "witnesses:*:create",
  "witnesses:*:read",
  "witnesses:*:update",
  "witnesses:*:delete",

  "auth:*:update_password"
];
export const commonUserPermissions = [
  "properties:*:read",
  "user-events:*:read",
  "auth:*:update_password"
];


export async function seedPermissions(prisma: PrismaClient) {
  return await prisma.permission.createMany({
    data: masterPermissions.map(permission => ({ name: permission })),
    skipDuplicates: true,
  });
}
