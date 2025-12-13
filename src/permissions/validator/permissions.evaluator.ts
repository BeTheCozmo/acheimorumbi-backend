import { Injectable } from "@nestjs/common";
import { PermissionsTokenizer } from "./permissions.tokenizer";
import { ParsedTokens } from "../dto/permission-token.dto";

@Injectable()
export class PermissionsEvaluator {
  
  constructor(
    private readonly permissionsTokenizer: PermissionsTokenizer,
  ) {}
  evaluate(permissions: string[], target: {systems: string[], ids: string[], action: string}): boolean {
    if (permissions.length == 0) return false;
    if (target.systems.length != target.ids.length) return false;
    if (target.systems.length == 0 || target.ids.length == 0) return false;

    const tokenizedPermissions = this.permissionsTokenizer.tokenize(permissions);
    const filteredTokens = this.filterPermissions(tokenizedPermissions, target);

    return this.isPermissionNotProhibited(filteredTokens);
  }

  private filterPermissions(permissionsTokens: ParsedTokens[], target: {systems: string[], ids: string[], action: string}): ParsedTokens[] {
    let filteredPermissions = [] as ParsedTokens[];
    filteredPermissions = this.filterBySystemsLength(permissionsTokens, target.systems.length);
    filteredPermissions = this.filterByAction(filteredPermissions, target.action);
    filteredPermissions = this.filterBySystemsAndIds(filteredPermissions, target.systems, target.ids);
    return filteredPermissions;
  }

  private isPermissionNotProhibited(permissionsTokens: ParsedTokens[]): boolean {
    if (permissionsTokens.length == 0) return false;
    
    let haveSomeProhibited = false;

    for (const parsedTokens of permissionsTokens) {
      if(parsedTokens.negated) {
        haveSomeProhibited = true;
        break;
      }
    }
    return !haveSomeProhibited;
  }

  private filterBySystemsLength(permissionsTokens: ParsedTokens[], length: number) {
    return permissionsTokens.filter(permissionToken => permissionToken.systemsAndIds.length == length);
  }

  private filterByAction(permissionsTokens: ParsedTokens[], action: string) {
    return permissionsTokens.filter(permissionsToken => permissionsToken.action.value == action);
  }

  private filterBySystemsAndIds(permissionsTokens: ParsedTokens[], systems: string[], ids: string[]) {
    if (systems.length != ids.length) return [];

    let filteredPermissions: ParsedTokens[] = [];
    for (const permissionTokens of permissionsTokens) 
      if (this.isValidSystemsAndIds(permissionTokens, systems, ids)) filteredPermissions.push(permissionTokens);

    return filteredPermissions;
  }

  private isValidSystemsAndIds(tokens: ParsedTokens, systems: string[], ids: string[]): boolean {
    const length = systems.length;
    let isValid = true;
    for (let i=0; i<length; i++) {
      if(!(
        tokens.systemsAndIds[i].system.value == systems[i] &&
        (tokens.systemsAndIds[i].id.value == ids[i] || tokens.systemsAndIds[i].id.value == "*") 
      )) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
}
