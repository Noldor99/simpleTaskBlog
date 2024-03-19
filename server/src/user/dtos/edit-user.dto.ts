import { PartialType } from '@nestjs/swagger'
import { CreateUserDto } from 'src/auth/dtos/create-user.dto'


export class EditUserDto extends PartialType(CreateUserDto) { }