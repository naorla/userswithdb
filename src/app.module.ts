import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma-service/prisma-service.service';
import { PrismaServiceModule } from './prisma-service/prisma-service.module';

@Module({
  imports: [UserModule, PrismaServiceModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
