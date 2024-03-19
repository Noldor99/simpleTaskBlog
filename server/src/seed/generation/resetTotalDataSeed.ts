import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/content/content.entity';
import { Role } from 'src/roles/role.entity';
import { User } from 'src/user/user.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ResetTotalDataSeed {
  constructor(
    @InjectRepository(Content) private contentRepository: Repository<Content>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) { }

  async seed(): Promise<void> {
    const repositories = [this.contentRepository, this.roleRepository, this.userRepository];

    const entities = await Promise.all(
      repositories.map(repository => repository.find())
    );

    await Promise.all(
      //@ts-ignore
      repositories.map((repository, index) => repository.remove(entities[index]))
    );
  }
}
