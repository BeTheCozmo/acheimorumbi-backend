import { PartialType } from '@nestjs/swagger';
import { CreateChecklistTitleDto } from './create-checklist-title.dto';

export class UpdateChecklistTitleDto extends PartialType(CreateChecklistTitleDto) {}
