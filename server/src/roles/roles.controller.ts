import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dtos/create-role.dto'
import { ApiParam, ApiTags } from '@nestjs/swagger'

import { Roles } from 'src/auth/auth-roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { Role } from './role.entity';

@ApiTags('1.3.roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) { }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(dto)
  }

  @Get()
  getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }

  @Get('/:value')
  getByValue(@Param('value') value: string): Promise<Role> {
    return this.rolesService.getByValue(value)
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('/:value')
  @ApiParam({ name: 'value', example: 'SIMPLE' })
  delete(@Param('value') value: string): Promise<Role> {
    return this.rolesService.delete(value)
  }
}
