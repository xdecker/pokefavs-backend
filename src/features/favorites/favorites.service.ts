import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { generateCode } from 'src/common/utils/code-generator';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritePokemonDto } from './dto/favorite-pokemon.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(pokemons: FavoritePokemonDto[]) {
    const code = await this.generateUniqueCode();

    if (pokemons.length == 0) {
      throw new BadRequestException("pokemons favorite list can't be empty");
    }

    //you can only have 6 slots of pokemons in games so..
    if (pokemons.length > 6) {
      throw new BadRequestException('max 6 pokemons allowed');
    }

    const ids = pokemons.map((p) => p.id);
    const uniqueIds = new Set(ids);

    if (uniqueIds.size !== pokemons.length) {
      throw new BadRequestException('Duplicate Pokemons list not allowed');
    }

    const jsonPokemons = pokemons.map((p) => ({
      id: p.id,
      name: p.name,
    }));

    const list = await this.prisma.favoriteList.create({
      data: {
        code,
        pokemons: jsonPokemons,
      },
    });

    return { code: list.code };
  }

  async findByCode(code: string) {
    if (!code)
      throw new BadRequestException('Please provide a valid code of the list');
    const list = await this.prisma.favoriteList.findUnique({
      where: { code },
    });
    if (!list) {
      throw new NotFoundException('favorite list not found');
    }

    return list;
  }

  private async generateUniqueCode(): Promise<string> {
    let code: string;
    let exists: boolean;

    do {
      code = generateCode();

      const list = await this.prisma.favoriteList.findUnique({
        where: { code },
      });

      exists = !!list;
    } while (exists);

    return code;
  }
}
