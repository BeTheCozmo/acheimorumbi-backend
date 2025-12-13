import { Inject, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesRepository } from './properties.repository';

@Injectable()
export class PropertiesService {
  @Inject() propertiesRepository: PropertiesRepository;
  create(createPropertyDto: CreatePropertyDto) {
    return this.propertiesRepository.create(createPropertyDto);
  }

  findAll() {
    return this.propertiesRepository.findAll();
  }

  findOne(id: number) {
    return this.propertiesRepository.findOne(id);
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesRepository.update(id, updatePropertyDto);
  }

  remove(id: number) {
    return this.propertiesRepository.remove(id);
  }
}
