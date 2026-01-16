import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserEventsService } from './user-events.service';
import { CreateUserEventDto } from './dto/create-user-event.dto';
import { UpdateUserEventDto } from './dto/update-user-event.dto';
import { AuthGuard } from '@modules/auth/auth.guard';
import { PermissionsGuard } from '@modules/permissions/permissions.guard';
import { Validator } from '@modules/permissions/permissions.decorator';
import { permissionsValidator } from '@modules/permissions/validator/permissions.validator';
import { FilterQueryDto } from 'src/common/dto/filter-query.dto';

@Controller('user-events')
@UseGuards(AuthGuard, PermissionsGuard)
export class UserEventsController {
  constructor(private readonly userEventsService: UserEventsService) {}

  // @Post()
  // create(@Body() createUserEventDto: CreateUserEventDto) {
  //   return this.userEventsService.create(createUserEventDto);
  // }

  @Get()
  @Validator(permissionsValidator({'user-events': 'id'}, ["read"]))
  findAll(@Query() query: FilterQueryDto & Record<string, any>) {
    const { limit, offset, page, orderBy, order, ...filters } = query;
    return this.userEventsService.findAll(filters, limit, offset, page, orderBy, order);
  }

  @Get('user/:uid')
  @Validator(permissionsValidator({'user-events': 'id'}, ["read"]))
  findAllOfUser(@Param('uid') uid: string) {
    return this.userEventsService.findAllOfUser(+uid);
  }

  @Get(':id')
  @Validator(permissionsValidator({'user-events': 'id'}, ["read"]))
  findOne(@Param('id') id: string) {
    return this.userEventsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserEventDto: UpdateUserEventDto) {
  //   return this.userEventsService.update(+id, updateUserEventDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userEventsService.remove(+id);
  // }
}
