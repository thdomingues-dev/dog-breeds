import { ref, type Ref } from 'vue';
import axios, { type AxiosResponse } from 'axios';
import type { FavoriteRequest, FavoritesResponse } from '@/types/api';

interface FavoritesComposable {
  favorites: Ref<string[]>;
  favLoading: Ref<boolean>;
  loadingBreeds: Ref<Set<string>>;
  error: Ref<string | null>;
  fetchFavorites: () => Promise<string[]>;
  addFavorite: (breed: string) => Promise<boolean>;
  removeFavorite: (breed: string) => Promise<boolean>;
  toggleFavorite: (breed: string) => Promise<boolean>;
  isFavorite: (breed: string) => boolean;
  isLoadingBreed: (breed: string) => boolean;
}

export function useFavorites(): FavoritesComposable {
  const favorites = ref<string[]>([]);
  const favLoading = ref<boolean>(false);
  const loadingBreeds = ref<Set<string>>(new Set());
  const error = ref<string | null>(null);

  const fetchFavorites = async (): Promise<string[]> => {
    try {
      error.value = null;
      const res: AxiosResponse<FavoritesResponse> = await axios.get('/favorites');
      favorites.value = res.data;
      return res.data;
    } catch (err) {
      console.error('Error fetching favorites:', err);
      error.value = 'Error loading favorites. Please try again.';
      return [];
    }
  };

  const addFavorite = async (breed: string): Promise<boolean> => {
    const normalizedBreed = breed.toLowerCase();
    loadingBreeds.value.add(normalizedBreed);
    favLoading.value = true;
    try {
      error.value = null;
      const payload: FavoriteRequest = { breed };
      await axios.post('/favorites', payload);

      if (!favorites.value.includes(normalizedBreed)) {
        favorites.value.push(normalizedBreed);
      }
      return true;
    } catch (err) {
      console.error('Error adding favorite:', err);
      error.value = 'Error adding to favorites. Please try again.';
      return false;
    } finally {
      loadingBreeds.value.delete(normalizedBreed);
      favLoading.value = false;
    }
  };

  const removeFavorite = async (breed: string): Promise<boolean> => {
    const normalizedBreed = breed.toLowerCase();
    loadingBreeds.value.add(normalizedBreed);
    favLoading.value = true;
    try {
      error.value = null;
      await axios.delete(`/favorites/${encodeURIComponent(breed)}`);
      favorites.value = favorites.value.filter(fav => fav !== normalizedBreed);
      return true;
    } catch (err) {
      console.error('Error removing favorite:', err);
      error.value = 'Error removing from favorites. Please try again.';
      return false;
    } finally {
      loadingBreeds.value.delete(normalizedBreed);
      favLoading.value = false;
    }
  };

  const toggleFavorite = async (breed: string): Promise<boolean> => {
    const normalizedBreed = breed.toLowerCase();
    const isFav = favorites.value.includes(normalizedBreed);

    if (isFav) {
      return await removeFavorite(breed);
    } else {
      return await addFavorite(breed);
    }
  };

  const isFavorite = (breed: string): boolean => {
    return favorites.value.includes(breed.toLowerCase());
  };

  const isLoadingBreed = (breed: string): boolean => {
    return loadingBreeds.value.has(breed.toLowerCase());
  };

  return {
    favorites,
    favLoading,
    loadingBreeds,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    isLoadingBreed,
  };
}
