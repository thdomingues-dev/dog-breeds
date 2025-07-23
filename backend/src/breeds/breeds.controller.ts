import { Controller, Get, Param, Query } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { PaginatedBreedsResponse } from './types/breeds.types';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Get()
  async getAllBreeds(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string
  ): Promise<PaginatedBreedsResponse> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    const searchTerm = search || '';

    return this.breedsService.getAllBreeds(pageNumber, limitNumber, searchTerm);
  }

  @Get(':breed/images')
  async getBreedImages(@Param('breed') breed: string): Promise<string[]> {
    return this.breedsService.getBreedImages(breed);
  }
}
