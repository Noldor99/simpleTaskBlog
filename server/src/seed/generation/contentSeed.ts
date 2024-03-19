import { Injectable } from '@nestjs/common';
import { SeederInterface } from '../seeder.interface';
import { CreateContentDto } from 'src/content/dto/create-content.dto';
import { ContentService } from 'src/content/content.service';
import { UserService } from 'src/user/user.service';
import { faker } from '@faker-js/faker'
import { lexicalContent, lexicalContent_2 } from '../data';

@Injectable()
export class ContentSeed implements SeederInterface {
  constructor(
    private readonly userService: UserService,
    private readonly contentService: ContentService,
  ) { }

  async seed() {

    const users = await this.userService.getAll({ limit: '200', page: '1' })

    for (let i = users.totalCount; i > 0; i--) {
      const variant =
        i % 3 === 0
          ? 'research'
          : i % 3 === 1
            ? 'commentary'
            : 'news';

      const text = i % 2 === 0
        ? lexicalContent
        : lexicalContent_2

      const contentSeed: CreateContentDto = {
        router: faker.lorem.slug(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        text: text,
        //@ts-ignore
        variant: variant
      };


      await new Promise(resolve => setTimeout(resolve, 10));
      await this.contentService.create(users.users[i - 1].id, contentSeed)
    }
  }
}
