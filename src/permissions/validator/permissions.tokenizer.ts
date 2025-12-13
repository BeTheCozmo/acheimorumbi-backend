import { Injectable } from "@nestjs/common";
import { ParsedTokens } from "../dto/permission-token.dto";

@Injectable()
export class PermissionsTokenizer {
  tokenize(permissions: string[]): ParsedTokens[] {
    const parsedTokensOfEachPermission = [] as ParsedTokens[];

    for (const permission of permissions) {
      parsedTokensOfEachPermission.push(
        this.tokenizeForPermission(permission)
      )
    }
    
    return parsedTokensOfEachPermission;
  }

  private tokenizeForPermission(permission: string): ParsedTokens {
    const tokens = permission.split(':');
    if (tokens.length % 2 == 0) return null;
    const tokensLenght = (tokens.length - 1) / 2;
    
    const parsedTokens = {
      action: null,
      systemsAndIds: [],
      negated: false,
    } as ParsedTokens;

    parsedTokens.negated = tokens[0].startsWith('-');
    if(parsedTokens.negated) tokens[0] = tokens[0].slice(1);
    for (let i = 0; i < tokensLenght; i++) {
      parsedTokens.systemsAndIds.push({
        system: { type: "system", value: tokens[i * 2] },
        id: { type: "id", value: tokens[(i * 2) + 1] }
      });
    }
    parsedTokens.action = { type: "action", value: tokens.at(-1) }
    return parsedTokens;
  }
}
