import { SetMetadata } from '@nestjs/common';
import PermissionsValidator from './validator/permissions.validator';

export const VALIDATOR_KEY = 'permissions_validator';
export const Validator = (validator: PermissionsValidator) => SetMetadata(VALIDATOR_KEY, validator);
