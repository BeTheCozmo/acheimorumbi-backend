import { PartialType } from '@nestjs/swagger';
import { CreatePartyFormDto } from './create-party-form.dto';

export class UpdatePartyFormDto extends PartialType(CreatePartyFormDto) {}
