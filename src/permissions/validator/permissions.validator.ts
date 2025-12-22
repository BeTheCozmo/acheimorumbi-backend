import { PermissionsTokenizer } from "./permissions.tokenizer";
import { PermissionsEvaluator } from "./permissions.evaluator";

export default class PermissionsValidator {
  readonly systemsAndParams: {[key: string]: string};
  readonly actions: string[];

  private readonly permissionsEvaluator: PermissionsEvaluator;

  constructor(systemsAndParams: {[key: string]: string}, actions: string[] = []) {
    this.systemsAndParams = systemsAndParams;
    this.actions = Array.from(
      new Set([...actions,])
    );

    this.permissionsEvaluator = new PermissionsEvaluator(new PermissionsTokenizer());
  }

  validate(permissions: string[], paramsIds: string[]): boolean {
    if(!this.actions.length) return false;

    const systems = Object.keys(this.systemsAndParams);
    let ids =
    paramsIds.length < systems.length
    ? [...paramsIds, ...Array(systems.length - paramsIds.length).fill("*")]
    : paramsIds;
    if (ids.length > systems.length) ids = ids.slice(0, systems.length);

    return this.actions.every(action => 
      this.permissionsEvaluator.evaluate(
        permissions,
        {
          action,
          ids,
          systems,
        }
      )
    );
  }
}

export function permissionsValidator(systemsAndParams: {[key: string]: string}, actions: string[] = []) {
  return new PermissionsValidator(systemsAndParams, actions);
}
