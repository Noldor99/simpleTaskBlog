import { IsOptional } from 'class-validator';

export class QueryUserParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  search?: string;
}
