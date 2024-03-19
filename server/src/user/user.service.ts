import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { AddRoleDto } from './dtos/add-role.dto';
import { RolesService } from 'src/roles/roles.service';
import { EditUserDto } from './dtos/edit-user.dto';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { QueryUserParamsDto } from './dtos/query-user-params.dto';
import { FileType, FilesService } from 'src/files/files.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private rolesService: RolesService,
    private fileService: FilesService,
  ) { }

  async createUser(dto: CreateUserDto, img): Promise<User> {

    let picturePath = null
    if (img) {
      picturePath = await this.fileService.createPostImage(
        FileType.USER,
        img,
      )
    }

    const user = this.userRepository.create({
      ...dto,
      userImg: picturePath,
    });

    const role = await this.rolesService.getByValue('USER');
    user.roles = [role];

    return this.userRepository.save(user);
  }

  async getAll(dto: QueryUserParamsDto) {
    const { page = '1', limit = '4', search } = dto;

    try {
      const queryBuilder = this.userRepository.createQueryBuilder('user');

      if (search) {
        queryBuilder
          .where('user.username ILIKE :search', { search: `%${search}%` })
          .orWhere('user.email ILIKE :search', { search: `%${search}%` });
      }

      const [users, totalCount] = await queryBuilder
        .leftJoinAndSelect('user.roles', 'roles')
        .orderBy({
          'user.createdAt': 'DESC',
        })
        .skip((+page - 1) * +limit)
        .take(+limit)
        .getManyAndCount();

      users.forEach(user => {
        //@ts-ignore
        user.roles = user.roles.map(item => item.value);
        delete user.password;
      });

      return { totalCount, users };
    } catch (error) {
      return { totalCount: 0, users: [] };
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      relations: { roles: true },
      where: {
        username
      }
    });

    return user ? { ...user } : null
  }

  async delete(adminId: string, id: string): Promise<User | null> {
    if (adminId === id) {
      throw new ForbiddenException('You cannot delete your own account');
    }

    const userToDelete = await this.userRepository.findOne({
      where: { id }
    });


    if (userToDelete) {

      return this.userRepository.remove(userToDelete);
    } else {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async addRole(dto: AddRoleDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId }
    });
    const role = await this.rolesService.getByValue(dto.value);

    if (user.roles.includes(role))
      throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);

    if (role && user) {
      user.roles.push(role);
      return this.userRepository.save(user);
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async getUserById(id): Promise<User | null> {
    const user = await this.userRepository.findOne({
      relations: { roles: true },
      where: { id }
    });
    //@ts-ignore
    user.roles = user.roles.map((item) => item.value)
    return user ? { ...user } : null
  }

  async addAdmin(id: string): Promise<User | null> {

    const user = await this.userRepository.findOne({
      relations: { roles: true },
      where: { id }
    });
    const role = await this.rolesService.getByValue('ADMIN');

    if (user.roles.includes(role))
      throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);

    if (role && user) {
      user.roles.push(role);
      return this.userRepository.save(user);
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async updateUser(id: string, dto: EditUserDto, img) {


    const user = await this.userRepository.findOne({
      where: { id: id }
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (key !== "userImg" && key !== 'password') {
        if (dto[key]) acc[key] = dto[key];
      }
      return acc;
    }, {});

    Object.assign(user, dtoFilter);

    const urlUserImg = user.userImg

    let picturePath = null

    if (img) {
      picturePath = await this.fileService.updatePostImage(
        urlUserImg,
        FileType.USER,
        img,
      )
      user.userImg = picturePath
    }

    if (dto.password) {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await this.userRepository.save(user);
    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }
}
