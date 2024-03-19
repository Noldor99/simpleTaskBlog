import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Content } from "./content.entity"
import { Repository } from "typeorm"
import { CreateContentDto } from "./dto/create-content.dto"
import { QueryContentParamsDto } from "./dto/query-content-params.dto"
import { UpdateContentDto } from "./dto/update-content.dto"
import { validUuidRegex } from "src/validation/const-valid"
import { UserService } from "src/user/user.service"

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    private userService: UserService,
  ) { }


  async create(userId, dto: CreateContentDto): Promise<Content> {
    const user = await this.userService.getUserById(userId);
    const content = this.contentRepository.create({
      ...dto,
      user: user,
    });
    return await this.contentRepository.save(content);
  }

  async getAll(dto: QueryContentParamsDto) {
    const { page = 1, limit = 4, variant, personRouter, search } = dto;
    try {
      let queryBuilder = this.contentRepository.createQueryBuilder('content')
        .orderBy('content.createdAt', 'DESC')
        .skip((+page - 1) * +limit)
        .take(+limit)


      if (variant && variant !== 'all') {
        queryBuilder = queryBuilder.where('content.variant = :variant', { variant });
      }

      if (search) {
        queryBuilder = queryBuilder
          .where(
            '(content.title LIKE :search OR content.description LIKE :search)',
            { search: `%${search}%` });
      }

      const [contents, totalCount] = await queryBuilder.getManyAndCount();

      return { totalCount, contents };
    } catch (e) {
      return { totalCount: 0, contents: [] }
    }
  }


  async findOne(id: string): Promise<Content> {

    if (!validUuidRegex.test(id)) {
      const content = await this.contentRepository.findOne({
        where: { router: id },

      })

      if (content) return content

    }

    const content = await this.contentRepository.findOne({
      where: { id },
    })
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`)
    }

    return content
  }

  async editContent(contentId: string, dto: UpdateContentDto) {
    const content = await this.findOne(contentId);


    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (dto[key]) acc[key] = dto[key];
      return acc;
    }, {});

    Object.assign(content, dtoFilter);

    const updatedContent = await this.contentRepository.save(content);
    return updatedContent;
  }


  async remove(id: string) {
    const content = await this.findOne(id);
    return this.contentRepository.remove(content)
  }

}
