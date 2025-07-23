import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post()
  async addFavorite(@Body('breed') breed: string) {
    await this.favoritesService.addFavorite(breed);
    return { message: 'Favorite added', breed };
  }

  @Delete(':breed')
  async removeFavorite(@Param('breed') breed: string) {
    await this.favoritesService.removeFavorite(breed);
    return { message: 'Favorite removed', breed };
  }
}
