import { Injectable } from '@nestjs/common';
import { CreateUserEventDto } from './dto/create-user-event.dto';
import { UpdateUserEventDto } from './dto/update-user-event.dto';
import { UserEventsRepository } from './user-events.repository';

@Injectable()
export class UserEventsService {
  constructor(
    private readonly userEventsRepository: UserEventsRepository,
  ) {}
  create(createUserEventDto: CreateUserEventDto) {
    return this.userEventsRepository.create(createUserEventDto);
  }

  findAll() {
    return this.userEventsRepository.findAll();
  }

  findAllOfUser(id: number) {
    return this.userEventsRepository.findAllOfUser(id);
  }

  findOne(id: number) {
    return this.userEventsRepository.findOne(id);
  }

  update(id: number, updateUserEventDto: UpdateUserEventDto) {
    return this.userEventsRepository.update(id, updateUserEventDto);
  }

  remove(id: number) {
    return this.userEventsRepository.remove(id);
  }
}
