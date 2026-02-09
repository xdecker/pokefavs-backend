import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let prisma: PrismaService;

  const prismaMock = {
    favoriteList: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  it('should create a favorite list', async () => {
    jest
      .spyOn<any, any>(service, 'generateUniqueCode')
      .mockResolvedValue('ABC123');

    prismaMock.favoriteList.create.mockResolvedValue({
      code: 'ABC123',
    });

    const pokemons = [
      { id: '25', name: 'pikachu' },
      { id: '1', name: 'bulbasaur' },
    ];

    const result = await service.create(pokemons);

    expect(result).toEqual({ code: 'ABC123' });
    expect(prisma.favoriteList.create).toHaveBeenCalled();
  });

  it('should throw if list is empty', async () => {
    await expect(service.create([])).rejects.toThrow(BadRequestException);
  });

  it('should throw if more than 6 pokemons', async () => {
    const pokemons = Array(7).fill({
      id: '1',
      name: 'bulbasaur',
    });

    await expect(service.create(pokemons)).rejects.toThrow(
      'max 6 pokemons allowed',
    );
  });

  it('should throw if duplicate pokemons', async () => {
    const pokemons = [
      { id: '25', name: 'pikachu' },
      { id: '25', name: 'pikachu' },
    ];

    await expect(service.create(pokemons)).rejects.toThrow(
      'Duplicate Pokemons list not allowed',
    );
  });



  it('should return list by code', async () => {
    prismaMock.favoriteList.findUnique.mockResolvedValue({
      code: 'ABC123',
      pokemons: [],
    });

    const result = await service.findByCode('ABC123');

    expect(result.code).toBe('ABC123');
  });

  it('should throw if code is empty', async () => {
    await expect(service.findByCode('')).rejects.toThrow(BadRequestException);
  });

  it('should throw if list not found', async () => {
    prismaMock.favoriteList.findUnique.mockResolvedValue(null);

    await expect(service.findByCode('XXX')).rejects.toThrow(NotFoundException);
  });
});
