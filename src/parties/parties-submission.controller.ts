import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePartyDto } from "./dto/create-party.dto";
import { PartiesService } from "./parties.service";

@ApiTags("Parties Submission")
@Controller('parties-submission')
export class PartiesSubmissionController {
  constructor(
    private readonly partiesService: PartiesService,
  ) {}
  @Post()
  create(@Body() createPartyDto: CreatePartyDto) {
    return this.partiesService.create(createPartyDto);
  }
}
