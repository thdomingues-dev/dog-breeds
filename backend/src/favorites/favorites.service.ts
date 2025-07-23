import { Injectable, Logger, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { BreedsService } from '../breeds/breeds.service';

const FAVORITES_FILE = path.resolve(__dirname, '../../favorites.json');

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);
  private favorites: Set<string> = new Set();

  constructor(
    @Inject(forwardRef(() => BreedsService))
    private readonly breedsService: BreedsService
  ) {
    void this.loadFavorites();
  }

  private async loadFavorites(): Promise<void> {
    try {
      if (await fs.pathExists(FAVORITES_FILE)) {
        const data: unknown = await fs.readJson(FAVORITES_FILE);
        if (Array.isArray(data) && data.every((item): item is string => typeof item === 'string')) {
          this.favorites = new Set(data);
          this.logger.log(`Loaded ${data.length} favorites from file`);
        } else {
          this.logger.warn('Invalid favorites file format, starting with empty list');
        }
      } else {
        this.logger.log('No favorites file found, starting with empty list');
      }
    } catch (error) {
      this.logger.error('Error loading favorites file', error);
      this.favorites = new Set();
    }
  }

  private async saveFavorites(): Promise<void> {
    try {
      await fs.writeJson(FAVORITES_FILE, Array.from(this.favorites), { spaces: 2 });
      this.logger.log(`Saved ${this.favorites.size} favorites to file`);
    } catch (error) {
      this.logger.error('Error saving favorites file', error);
      throw new HttpException('Failed to save favorites', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getFavorites(): string[] {
    return Array.from(this.favorites);
  }

  async addFavorite(breed: string): Promise<void> {
    if (!breed || breed.trim() === '') {
      throw new HttpException('Breed name is required', HttpStatus.BAD_REQUEST);
    }

    const normalizedBreed = breed.trim().toLowerCase();

    const allBreeds = await this.breedsService['fetchAllBreeds']();
    if (!allBreeds.includes(normalizedBreed)) {
      throw new HttpException(`Breed '${normalizedBreed}' does not exist`, HttpStatus.BAD_REQUEST);
    }
    if (this.favorites.has(normalizedBreed)) {
      this.logger.log(`Breed '${normalizedBreed}' is already in favorites`);
      return; // Already in favorites, no need to do anything
    }

    this.favorites.add(normalizedBreed);
    await this.saveFavorites();
    this.logger.log(`Added '${normalizedBreed}' to favorites`);
  }

  async removeFavorite(breed: string): Promise<void> {
    if (!breed || breed.trim() === '') {
      throw new HttpException('Breed name is required', HttpStatus.BAD_REQUEST);
    }

    const normalizedBreed = breed.trim().toLowerCase();

    if (!this.favorites.has(normalizedBreed)) {
      throw new HttpException(
        `Breed '${normalizedBreed}' is not in favorites`,
        HttpStatus.NOT_FOUND
      );
    }

    this.favorites.delete(normalizedBreed);
    await this.saveFavorites();
    this.logger.log(`Removed '${normalizedBreed}' from favorites`);
  }

  isFavorite(breed: string): boolean {
    if (!breed) return false;
    return this.favorites.has(breed.trim().toLowerCase());
  }
}
