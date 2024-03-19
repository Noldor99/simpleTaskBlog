import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dtos/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) { }

  async create(dto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(dto);
    return this.roleRepository.save(role);
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async getByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { value } });

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    return role ? { ...role } : null;
  }

  async getRolesById(id: string): Promise<Role> {
    const role = this.roleRepository.findOne({
      where: { id }
    });

    return role ? { ...role } : null;
  }

  async delete(value: string): Promise<Role> {
    const roleToDelete = await this.roleRepository.findOne({ where: { value } });

    if (!roleToDelete) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    return this.roleRepository.remove(roleToDelete);
  }
}
