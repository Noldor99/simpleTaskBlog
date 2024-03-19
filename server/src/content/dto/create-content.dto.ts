import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUnique } from 'src/validation/is-unique';
import { ContentVariant } from '../type';

export class CreateContentDto {
  @ApiProperty({
    example: 'simple',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 40)
  @IsUnique({ tableName: 'content', column: 'router' })
  readonly router: string;

  @ApiProperty({
    example: 'Amber',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly title: string;

  @ApiProperty({
    example: 'Amber helps clients access liquidity, earn yield, and manage risk across crypto-assets.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly description: string;

  @ApiProperty({
    example: 'research',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(ContentVariant))
  readonly variant: ContentVariant;

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  @IsNotEmpty()
  @IsString()
  readonly text: string;
}
