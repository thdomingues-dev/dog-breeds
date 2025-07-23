<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios, { type AxiosResponse } from 'axios';
  import BreedImagesModal from './BreedImagesModal.vue';
  import BaseCard from './base/BaseCard.vue';
  import EmptyState from './base/EmptyState.vue';
  import LoadingSpinner from './base/LoadingSpinner.vue';
  import SearchBar from './SearchBar.vue';
  import PaginationControls from './PaginationControls.vue';
  import { useFavorites } from '../composables/useFavorites';
  import { usePagination } from '../composables/usePagination';
  import type { PaginatedBreedsResponse, PaginationParams } from '@/types/api';

  const breeds = ref<string[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);
  const searchTerm = ref<string>('');

  const showModal = ref<boolean>(false);
  const selectedBreed = ref<string | null>(null);

  const { fetchFavorites, toggleFavorite, isFavorite, isLoadingBreed } = useFavorites();

  const {
    currentPage,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    pageNumbers,
    goToPage,
    nextPage,
    prevPage,
    resetToFirstPage,
    updatePaginationMeta,
    getPaginationParams,
  } = usePagination();

  function openModal(breed: string): void {
    selectedBreed.value = breed;
    showModal.value = true;
  }

  function closeModal(): void {
    showModal.value = false;
    selectedBreed.value = null;
  }

  async function fetchBreeds(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const params = new URLSearchParams();
      const paginationParams: PaginationParams = getPaginationParams();

      params.append('page', paginationParams.page.toString());
      params.append('limit', paginationParams.limit.toString());

      if (searchTerm.value.trim()) {
        params.append('search', searchTerm.value.trim());
      }

      const res: AxiosResponse<PaginatedBreedsResponse> = await axios.get(`/breeds?${params}`);

      breeds.value = res.data.data;

      updatePaginationMeta(res.data.meta);
    } catch (err) {
      console.error('Error fetching breeds:', err);
      error.value = 'Error loading breeds. Please try again.';
      breeds.value = [];
      updatePaginationMeta({
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false,
      });
    } finally {
      loading.value = false;
    }
  }

  const handleSearch = (searchValue: string): void => {
    searchTerm.value = searchValue;
    resetToFirstPage();
    fetchBreeds();
  };

  const handlePageChange = (page: number): void => {
    goToPage(page, fetchBreeds);
  };

  const handleNextPage = (): void => {
    nextPage(fetchBreeds);
  };

  const handlePrevPage = (): void => {
    prevPage(fetchBreeds);
  };

  const handleFavoriteToggle = async (breed: string): Promise<void> => {
    await toggleFavorite(breed);
  };

  onMounted(() => {
    fetchBreeds();
    fetchFavorites();
  });
</script>

<template>
  <section class="breeds-section">
    <div class="section-header">
      <div class="title-group">
        <p class="section-subtitle">Explore amazing dog breeds from around the world</p>
      </div>

      <SearchBar
        v-model="searchTerm"
        placeholder="Search for your favorite breed..."
        @search="handleSearch"
      />

      <div class="results-info" v-if="!loading && totalItems > 0">
        <span class="results-count">{{ totalItems }}</span>
        {{ totalItems === 1 ? 'breed' : 'breeds' }} found
        <span v-if="totalPages > 1" class="page-info">
          • Page {{ currentPage }} of {{ totalPages }}
        </span>
      </div>
    </div>

    <LoadingSpinner v-if="loading" text="Loading breeds..." />

    <EmptyState
      v-else-if="error"
      icon="error"
      :title="error"
      show-action
      action-text="Try Again"
      @action-click="fetchBreeds"
    />

    <EmptyState
      v-else-if="breeds.length === 0"
      icon="search"
      :title="searchTerm ? `No breeds found for '${searchTerm}'` : 'No breeds available'"
      :subtitle="searchTerm ? 'Try a different search term' : 'Start exploring breeds'"
    />

    <div v-else>
      <div class="breeds-grid">
        <BaseCard
          v-for="breed in breeds"
          :key="breed"
          :title="breed"
          :is-favorite="isFavorite(breed)"
          :loading="isLoadingBreed(breed)"
          @favorite-click="handleFavoriteToggle(breed)"
          @card-click="openModal(breed)"
        />
      </div>

      <PaginationControls
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="totalItems"
        :has-next-page="hasNextPage"
        :has-previous-page="hasPreviousPage"
        :page-numbers="pageNumbers"
        @page-change="handlePageChange"
        @next-page="handleNextPage"
        @prev-page="handlePrevPage"
      />
    </div>

    <BreedImagesModal :breed="selectedBreed" :show="showModal" @close="closeModal" />
  </section>
</template>

<style scoped>
  .breeds-section {
    padding: 0;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  .section-header {
    margin-bottom: 1rem;
    padding: 0 1rem;
  }

  .title-group {
    text-align: center;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .title-icon {
    font-size: 2rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: #6b7280;
    margin: 0;
  }

  .search-container {
    max-width: 500px;
    margin: 0 auto;
  }

  .search-wrapper {
    position: relative;
    margin-bottom: 0.75rem;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.1rem;
    color: #9ca3af;
  }

  .search-input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #e5e7eb;
    border-radius: 16px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f9fafb;
    box-sizing: border-box;
  }

  .search-input:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .search-input:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .results-info {
    text-align: center;
    font-size: 0.9rem;
    color: #6b7280;
    margin-top: 1rem;
  }

  .results-count {
    font-weight: 600;
    color: #667eea;
  }

  .page-info {
    color: #9ca3af;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 2rem;
    text-align: center;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f4f6;
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  .loading-text {
    font-size: 1.1rem;
    color: #6b7280;
    margin: 0;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .error-state,
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 2rem;
    text-align: center;
  }

  .error-icon,
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .error-message,
  .empty-message {
    font-size: 1.1rem;
    color: #6b7280;
    margin: 0 0 2rem 0;
  }

  .retry-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .retry-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  .retry-icon {
    font-size: 1.1rem;
  }

  .breeds-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
    padding: 0 1rem;
    margin: 4rem 0 0;
    min-height: 300px;
    width: 100%;
  }

  @media (min-width: 1200px) {
    .breeds-grid {
      grid-template-columns: repeat(5, 1fr);
      gap: 1rem;
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    .breeds-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .breeds-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }
  }

  @media (min-width: 576px) and (max-width: 767px) {
    .breeds-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }
  }

  @media (max-width: 768px) {
    .section-title {
      font-size: 2rem;
    }
    .breeds-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      padding: 0 0.5rem;
      margin-top: 1.5rem;
    }
  }
</style>
