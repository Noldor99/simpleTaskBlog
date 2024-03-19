import { Injectable, Logger } from '@nestjs/common'
import { Promise as Bluebird } from 'bluebird'
import { SeederInterface } from './seeder.interface'
import { RoleSeeder } from './generation/roleSeeder'
import { UserSeed } from './generation/userSeed'
import { ResetTotalDataSeed } from './generation/resetTotalDataSeed'
import { ContentSeed } from './generation/contentSeed'
const isProdaction = process.env.NODE_ENV === 'prodaction'

@Injectable()
export class SeedService {
  private readonly seeders = []
  private readonly logger = new Logger(SeedService.name)

  constructor(
    private readonly resetTotalDataSeed: ResetTotalDataSeed,
    private readonly userSeed: UserSeed,
    private readonly roleSeed: RoleSeeder,
    private readonly contentSeed: ContentSeed,

  ) {
    this.seeders = isProdaction
      ? [
        // this.resetTotalDataSeed,
        this.roleSeed,
        this.userSeed,
        this.contentSeed,
      ]
      : [
        this.resetTotalDataSeed,
        this.roleSeed,
        this.userSeed,
        this.contentSeed,

      ]
  }

  async seed() {
    await Bluebird.each(this.seeders, async (seeder: SeederInterface) => {
      this.logger.log(`Seeding ${seeder.constructor.name}`)
      await seeder.seed()
    })
  }
}
