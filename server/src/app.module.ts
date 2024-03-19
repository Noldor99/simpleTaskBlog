import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { DatabaseModule } from "./database/database.module";
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CookiesMiddleware } from './auth/cookies.middleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { FilesModule } from "./files/files.module";
import { ContentModule } from "./content/content.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/api',
      rootPath: path.resolve(__dirname, 'static'),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get('ACCESS_TOKEN_SECRET') ||
          'your_access_token_secret_value_web3',
        signOptions: {
          expiresIn: configService.get('ACCESS_TOKEN_EXPIRES_IN') || '36000s',
        },
      }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    RolesModule,
    FilesModule,
    ContentModule,
  ]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookiesMiddleware).forRoutes('*')
  }
}
