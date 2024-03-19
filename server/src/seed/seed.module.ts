import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { RoleSeeder } from './generation/roleSeeder'
import { UserSeed } from './generation/userSeed'
import { RolesModule } from 'src/roles/roles.module'
import { SeedService } from './seed.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { DatabaseModule } from 'src/database/database.module'
import { ResetTotalDataSeed } from './generation/resetTotalDataSeed'
import { Role } from 'src/roles/role.entity'
import { User } from 'src/user/user.entity'
import { Content } from 'src/content/content.entity'
import { ContentModule } from 'src/content/content.module'
import { ContentSeed } from './generation/contentSeed'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Role, User, Content]),
    UserModule,
    AuthModule,
    RolesModule,
    ContentModule,
  ],
  providers: [
    SeedService,
    RoleSeeder,
    UserSeed,
    ResetTotalDataSeed,
    ContentSeed,
  ],
  exports: [SeedService]

})
export class SeedModule { }
