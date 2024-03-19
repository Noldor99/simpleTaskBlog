import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Content } from './content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { IsUniqueConstraint } from 'src/validation/is-unique-constraint';

@Module({
  imports: [TypeOrmModule.forFeature([Content]), UserModule],
  controllers: [ContentController],
  providers: [ContentService, IsUniqueConstraint],
  exports: [ContentService],
})
export class ContentModule { }
