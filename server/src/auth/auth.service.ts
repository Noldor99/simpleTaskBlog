import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CookieOptions } from 'express'
import * as bcrypt from 'bcryptjs'
import { UserService } from 'src/user/user.service'
import { LoginUserDto } from './dtos/login-user.dto'
import { CreateUserDto } from './dtos/create-user.dto'
import { User } from 'src/user/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }


  private readonly isDevelopment = process.env.NODE_ENV === 'development'

  private readonly accessTokenSecret: string =
    process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret_value_web3'
  private readonly accessTokenExpiresIn: string =
    process.env.ACCESS_TOKEN_EXPIRES_IN || '150s'

  private readonly refreshTokenSecret: string =
    process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret_value_web3'
  private readonly refreshTokenExpiresIn: string =
    process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.getUserByUsername(username)

    if (!user) {
      return null
    }

    const isPasswordCorrect = await bcrypt.compare(pass, user.password)

    if (!isPasswordCorrect) {
      return null
    }

    const { password, ...userWithoutPassword } = user

    return userWithoutPassword
  }

  getCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      signed: true,
      sameSite: 'strict',
      secure: this.isDevelopment ? false : true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  }

  async login(loginDto: LoginUserDto) {
    try {
      const getUser = await this.validateUser(
        loginDto.username,
        loginDto.password,
      )

      const { password, ...user } = getUser

      //@ts-ignore
      user.roles = user.roles.map((item) => item.value)
      const accessToken = this.jwtService.sign(
        { sub: user.id, user },
        {
          secret: this.accessTokenSecret,
          expiresIn: this.accessTokenExpiresIn,
        },
      )

      const refreshToken = this.jwtService.sign(
        { sub: user.id },
        {
          secret: this.refreshTokenSecret,
          expiresIn: this.refreshTokenExpiresIn,
        },
      )

      return {
        message: 'Login success',
        accessToken,
        refreshToken,
        success: true,
        user,

      }

    } catch (error) {
      return {
        message: 'Login failed. Invalid username or password.',
        success: false,
      }
    }
  }

  async refresh(req) {
    const getUser = await this.userService.getUserById(req.user.id)

    const { password, ...user } = getUser
    return user
  }

  async register(registerDto: CreateUserDto, img) {
    try {
      const candidate = await this.userService.getUserByUsername(
        registerDto.username,
      );

      if (candidate) {
        throw new HttpException(
          { message: 'User with this username already exists' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const savedUser = await this.userService.createUser({
        ...registerDto,
        password: hashedPassword,
      }, img);

      if (!savedUser) {
        throw new HttpException(
          { message: 'Registration failed' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const { password, ...user } = savedUser;

      return { ...user }

    } catch (error) {
      return error
    }
  }
}
