import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
  @ApiProperty({ example: 'USER' })
  readonly value: string

  @ApiProperty({ example: 'USER role with access' })
  readonly description: string
}
