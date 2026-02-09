import { IsString } from 'class-validator';

export class FavoritePokemonDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
