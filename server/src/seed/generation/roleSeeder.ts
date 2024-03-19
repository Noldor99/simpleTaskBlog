import { Injectable } from '@nestjs/common'
import { SeederInterface } from '../seeder.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from 'src/roles/role.entity'

@Injectable()
export class RoleSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) { }

  async seed() {
    const rolesData = [
      { value: 'ADMIN', description: 'Administrator role with full access' },
      { value: 'MODER', description: 'Regular moder role' },
      { value: 'USER', description: 'Regular user role' },
    ]

    const role = await this.roleRepository.create(rolesData)
    await this.roleRepository.save(role)
  }
}
