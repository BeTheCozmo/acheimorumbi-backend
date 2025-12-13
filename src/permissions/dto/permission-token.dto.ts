export type PermissionToken<SysType = "system" | "id" | "action"> = {
  type: SysType;
  value: string;
}

export type SystemToken = PermissionToken<"system">;
export type IdToken = PermissionToken<"id">;
export type ActionToken = PermissionToken<"action">;

export type SystemAndIdTokens = {
  system: SystemToken;
  id: IdToken;
}

export type ParsedTokens = {
  systemsAndIds: SystemAndIdTokens[];
  action: ActionToken;
  negated: boolean;
}
