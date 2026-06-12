import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [PrismaModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
