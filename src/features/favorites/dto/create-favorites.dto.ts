import {
    IsArray,
    ArrayNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class CreateFavoritesDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    pokemons: string[];
  }
  