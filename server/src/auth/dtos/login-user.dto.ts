import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, Length } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({
    example: 'admin',
    description: 'The username of the user',
  })
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly username: string

  @ApiProperty({
    example: 'Jw9gP2xqL',
    description: 'The password of the user',
  })
  @IsString({ message: 'Must be a string' })
  @Length(8, 16, { message: 'Must be between 8 and 16 characters' })
  readonly password: string
}
