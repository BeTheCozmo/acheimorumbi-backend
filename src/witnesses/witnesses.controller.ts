import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WitnessesService } from './witnesses.service';
import { CreateWitnessDto } from './dto/create-witness.dto';
import { UpdateWitnessDto } from './dto/update-witness.dto';

@Controller('witnesses')
export class WitnessesController {
  constructor(private readonly witnessesService: WitnessesService) {}

  @Post()
  create(@Body() createWitnessDto: CreateWitnessDto) {
    return this.witnessesService.create(createWitnessDto);
  }

  @Get()
  findAll() {
    return this.witnessesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.witnessesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWitnessDto: UpdateWitnessDto) {
    return this.witnessesService.update(+id, updateWitnessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.witnessesService.remove(+id);
  }
}
