import { IsOptional } from 'class-validator';
import { ContentVariant } from '../type';

export class QueryContentParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  variant?: ContentVariant;

  @IsOptional()
  personRouter?: string;

  @IsOptional()
  search?: string;
}
