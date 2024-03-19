import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { CustomRequest } from 'src/seed/types'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<CustomRequest>()

    const isAuthenticated = request.isAuthenticated

    return isAuthenticated
  }
}
