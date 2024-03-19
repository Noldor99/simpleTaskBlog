import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryContentParamsDto } from './dto/query-content-params.dto';
import { ContentVariant } from './type';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Req() req, @Body() createContentDto: CreateContentDto) {
    return this.contentService.create(req.user.id, createContentDto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  @ApiQuery({
    name: 'variant',
    required: false,
    type: String,
    enum: ContentVariant,
  })
  @ApiQuery({ name: 'personRouter', type: String, required: false })
  @ApiQuery({ name: 'search', type: String, required: false })
  getAll(@Query() params: QueryContentParamsDto) {
    return this.contentService.getAll(params);

  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the content' })
  getOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') contentId: string,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    return await this.contentService.editContent(contentId, updateContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(id);
  }
}
