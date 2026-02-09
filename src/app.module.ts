import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { FavoritesService } from './features/favorites/favorites.service';
import { FavoritesModule } from './features/favorites/favorites.module';

@Module({
  imports: [PrismaModule, FavoritesModule],
  providers: [PrismaService, FavoritesService],
})
export class AppModule {}
