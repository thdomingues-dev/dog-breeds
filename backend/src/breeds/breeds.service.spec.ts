import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { BreedsService } from './breeds.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BreedsService', () => {
  let service: BreedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreedsService],
    }).compile();

    service = module.get<BreedsService>(BreedsService);
    jest.clearAllMocks();
  });

  describe('getAllBreeds', () => {
    it('should return breeds', async () => {
      const mockResponse = {
        data: {
          status: 'success',
          message: {
            bulldog: [],
            retriever: [],
            husky: [],
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await service.getAllBreeds();

      expect(result).toEqual(['bulldog', 'retriever', 'husky']);
      expect(mockedAxios.get).toHaveBeenCalledWith('https://dog.ceo/api/breeds/list/all', {
        timeout: 10000,
      });
    });

    it('should use cache on subsequent calls', async () => {
      const mockResponse = {
        data: {
          status: 'success',
          message: { bulldog: [] },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      await service.getAllBreeds();
      const result = await service.getAllBreeds();

      expect(result).toEqual(['bulldog']);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it('should throw HttpException when API returns error status', async () => {
      const mockResponse = {
        data: {
          status: 'error',
          message: 'API Error',
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      await expect(service.getAllBreeds()).rejects.toThrow(
        new HttpException('Failed to fetch breeds from Dog CEO API', HttpStatus.BAD_GATEWAY)
      );
    });

    it('should handle timeout errors', async () => {
      const timeoutError = new Error('timeout');
      (timeoutError as any).code = 'ECONNABORTED';

      mockedAxios.get.mockRejectedValueOnce(timeoutError);

      await expect(service.getAllBreeds()).rejects.toThrow(
        new HttpException('Timeout connecting to Dog CEO API', HttpStatus.GATEWAY_TIMEOUT)
      );
    });
  });

  describe('getBreedImages', () => {
    it('should return breed images successfully', async () => {
      const mockResponse = {
        data: {
          status: 'success',
          message: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await service.getBreedImages('bulldog');

      expect(result).toEqual(['image1.jpg', 'image2.jpg', 'image3.jpg']);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://dog.ceo/api/breed/bulldog/images/random/3',
        { timeout: 10000 }
      );
    });

    it('should normalize breed name to lowercase', async () => {
      const mockResponse = {
        data: {
          status: 'success',
          message: ['image1.jpg'],
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      await service.getBreedImages('BULLDOG');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://dog.ceo/api/breed/bulldog/images/random/3',
        { timeout: 10000 }
      );
    });

    it('should throw BadRequest for empty breed name', async () => {
      await expect(service.getBreedImages('')).rejects.toThrow(
        new HttpException('Breed name is required', HttpStatus.BAD_REQUEST)
      );

      await expect(service.getBreedImages('   ')).rejects.toThrow(
        new HttpException('Breed name is required', HttpStatus.BAD_REQUEST)
      );

      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should handle breed not found (404)', async () => {
      const notFoundError = {
        response: { status: 404 },
      };

      mockedAxios.get.mockRejectedValueOnce(notFoundError);

      await expect(service.getBreedImages('invalidbreed')).rejects.toThrow(
        new HttpException("Breed 'invalidbreed' not found", HttpStatus.NOT_FOUND)
      );
    });

    it('should handle API error status', async () => {
      const mockResponse = {
        data: {
          status: 'error',
          message: 'Breed not found',
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      await expect(service.getBreedImages('invalidbreed')).rejects.toThrow(
        new HttpException("Breed 'invalidbreed' not found", HttpStatus.NOT_FOUND)
      );
    });
  });
});
