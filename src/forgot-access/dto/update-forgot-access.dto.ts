import { PartialType } from '@nestjs/swagger';
import { CreateForgotAccessDto } from './create-forgot-access.dto';

export class UpdateForgotAccessDto extends PartialType(CreateForgotAccessDto) {}
