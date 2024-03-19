import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class AddRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'The value of the role',
  })
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly value: string

  @ApiProperty({
    example: '659c2b132cb6160d22db023b',
    description: 'The user ID',
  })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly userId: string
}
