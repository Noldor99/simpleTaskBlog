import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Body,
  Post,
  Patch,
  Req,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { UserService } from './user.service'
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { AddRoleDto } from './dtos/add-role.dto'
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/auth/auth-roles.decorator'
import { EditUserDto } from './dtos/edit-user.dto'
import { User } from './user.entity'
import { QueryUserParamsDto } from './dtos/query-user-params.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileType } from 'src/files/files.service'

@ApiTags('1.2.users')
@Controller('/users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) { }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  @ApiQuery({ name: 'search', type: String, required: false })
  getAll(@Query() params: QueryUserParamsDto) {
    return this.userService.getAll(params)
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const userGet = await this.userService.getUserById(id)
    const { password, ...user } = userGet
    return user
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('/:id')
  delete(@Req() req, @Param('id') id: string): Promise<User> {
    return this.userService.delete(req.user.id, id)
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto): Promise<User> {
    return this.userService.addRole(dto)
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(FileType.USER))
  @Patch('/edit')
  updateUser(@Req() req, @Body() dto: EditUserDto, @UploadedFile() img) {
    return this.userService.updateUser(req.user.id, dto, img)
  }

}
