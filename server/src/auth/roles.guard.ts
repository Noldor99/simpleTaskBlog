import {
  ExecutionContext,
  CanActivate,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ROLES_KEY } from './auth-roles.decorator'
import { Reflector } from '@nestjs/core'
import { CustomRequest } from 'src/seed/types'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) { }

  private readonly accessTokenName =
    this.configService.get('ACCESS_TOKEN_NAME') || 'access_token'
  private readonly accessTokenSecret =
    this.configService.get('ACCESS_TOKEN_SECRET') ||
    'your_access_token_secret_value_web3'

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) return true

    const req = context.switchToHttp().getRequest<CustomRequest>()

    try {
      const accessToken = req.signedCookies[this.accessTokenName]

      if (!accessToken) {
        throw new HttpException('Not auth', 401)
      }

      const { user } = this.jwtService.verify(accessToken, {
        secret: this.accessTokenSecret,
      })

      req.user = { ...user }

      const userRoles = req.user?.roles || []

      if (!userRoles.some((role) => requiredRoles.includes(role))) {
        throw new HttpException(
          { message: 'Denied access' },
          HttpStatus.FORBIDDEN,
        )
      }

      return true
    } catch (e) {
      throw new HttpException(
        { message: 'Denied access' },
        HttpStatus.FORBIDDEN,
      )
    }
  }
}
