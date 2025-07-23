import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { PaginatedBreedsResponse } from './types/breeds.types';

@Injectable()
export class BreedsService {
  private breedsCache: string[] | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  async getAllBreeds(
    page: number = 1,
    limit: number = 10,
    search: string = ''
  ): Promise<PaginatedBreedsResponse> {
    const allBreeds = await this.fetchAllBreeds();

    const filteredBreeds = search
      ? allBreeds.filter(breed => breed.toLowerCase().includes(search.toLowerCase()))
      : allBreeds;

    const totalItems = filteredBreeds.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filteredBreeds.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      meta: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  private async fetchAllBreeds(): Promise<string[]> {
    if (this.breedsCache && Date.now() - this.cacheTimestamp < this.CACHE_TTL) {
      return this.breedsCache;
    }

    try {
      const response = await axios.get('https://dog.ceo/api/breeds/list/all', {
        timeout: 10000,
      });

      if (response.data.status !== 'success') {
        throw new HttpException('Failed to fetch breeds from Dog CEO API', HttpStatus.BAD_GATEWAY);
      }

      const breedsObj = response.data.message;
      this.breedsCache = Object.keys(breedsObj).sort();
      this.cacheTimestamp = Date.now();

      return this.breedsCache;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        throw new HttpException('Timeout connecting to Dog CEO API', HttpStatus.GATEWAY_TIMEOUT);
      }
      throw new HttpException('Error fetching breeds from external API', HttpStatus.BAD_GATEWAY);
    }
  }

  async getBreedImages(breed: string): Promise<string[]> {
    if (!breed || breed.trim() === '') {
      throw new HttpException('Breed name is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const response = await axios.get(
        `https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random/3`,
        { timeout: 10000 }
      );

      if (response.data.status !== 'success') {
        throw new HttpException(`Breed '${breed}' not found`, HttpStatus.NOT_FOUND);
      }

      return response.data.message;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException(`Breed '${breed}' not found`, HttpStatus.NOT_FOUND);
      }
      if (error.code === 'ECONNABORTED') {
        throw new HttpException('Timeout connecting to Dog CEO API', HttpStatus.GATEWAY_TIMEOUT);
      }
      throw new HttpException(
        'Error fetching breed images from external API',
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}
