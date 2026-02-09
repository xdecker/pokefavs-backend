import { Type } from 'class-transformer';
import { IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { FavoritePokemonDto } from './favorite-pokemon.dto';

export class CreateFavoritesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FavoritePokemonDto)
  pokemons: FavoritePokemonDto[];
}
