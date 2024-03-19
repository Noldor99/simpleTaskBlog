import { Module, forwardRef } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './local.strategy'
import { UserModule } from 'src/user/user.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule { }
