import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { CreateUserDto } from 'src/auth/dtos/create-user.dto'
import { UserService } from 'src/user/user.service'
import { SeederInterface } from '../seeder.interface'
import { faker } from '@faker-js/faker'

@Injectable()
export class UserSeed implements SeederInterface {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  async seed() {

    for (let i = 0; i < 21; i++) {
      const userData: CreateUserDto = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),

      };
      await this.authService.register(userData, undefined)

    }
    //
    const usersSeedData: CreateUserDto[] = [
      { username: 'admin', email: 'admin_user@example.com', password: 'Jw9gP2xqL' },
      { username: 'jane_doe', email: 'new_user2@example.com', password: 'strongPassword' },
      { username: 'light', email: 'new_user3@example.com', password: 'secure' },
    ];


    for (const userData of usersSeedData) {
      await this.authService.register(userData, undefined)
    }

    const user = await this.userService.getUserByUsername(
      usersSeedData[0].username,
    )

    await this.userService.addAdmin(user.id)

  }
}
