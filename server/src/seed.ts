import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';

async function start() {
  const app = await NestFactory.create(SeedModule);
  const seeder = app.get(SeedService)
  await seeder.seed()
  await app.close()

}
start();
