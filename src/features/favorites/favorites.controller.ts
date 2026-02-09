import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoritesDto } from './dto/create-favorites.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private service: FavoritesService) {}

  @Post()
  create(@Body() dto: CreateFavoritesDto) {
    return this.service.create(dto.pokemons);
  }

  @Get(":code")
  findByCode(@Param('code') code: string) {
    return this.service.findByCode(code);
  }
}
