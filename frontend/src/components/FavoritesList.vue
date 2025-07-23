<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import BreedImagesModal from './BreedImagesModal.vue';
  import BaseCard from './base/BaseCard.vue';
  import EmptyState from './base/EmptyState.vue';
  import LoadingSpinner from './base/LoadingSpinner.vue';
  import { useFavorites } from '../composables/useFavorites';

  const showModal = ref<boolean>(false);
  const selectedBreed = ref<string | null>(null);

  const { favorites, error, fetchFavorites, removeFavorite, isLoadingBreed } = useFavorites();

  const loading = ref<boolean>(true);

  function openModal(breed: string): void {
    selectedBreed.value = breed;
    showModal.value = true;
  }

  function closeModal(): void {
    showModal.value = false;
    selectedBreed.value = null;
  }

  const handleRemoveFavorite = async (breed: string): Promise<void> => {
    await removeFavorite(breed);
  };

  const loadFavorites = async (): Promise<void> => {
    loading.value = true;
    try {
      await fetchFavorites();
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    loadFavorites();
  });
</script>

<template>
  <section class="favorites-section">
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
              fill="currentColor"
            />
          </svg>
        </span>
        Your Favorite Breeds
      </h2>
      <p class="section-subtitle">Manage your collection of beloved dog breeds</p>
    </div>

    <LoadingSpinner v-if="loading" text="Loading your favorites..." />

    <EmptyState
      v-else-if="error"
      icon="error"
      :title="error"
      show-action
      action-text="Try Again"
      @action-click="loadFavorites"
    />

    <EmptyState
      v-else-if="favorites.length === 0"
      icon="heart"
      title="No favorite breeds yet"
      subtitle="Start exploring breeds and add them to your favorites!"
    />

    <div v-else class="favorites-grid">
      <BaseCard
        v-for="favorite in favorites"
        :key="favorite"
        :title="favorite"
        :show-favorite-button="false"
        show-remove-button
        :loading="isLoadingBreed(favorite)"
        @remove-click="handleRemoveFavorite(favorite)"
        @card-click="openModal(favorite)"
      />
    </div>

    <BreedImagesModal :breed="selectedBreed" :show="showModal" @close="closeModal" />
  </section>
</template>

<style scoped>
  .favorites-section {
    padding: 0.5rem 0;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  .section-header {
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
    font-size: 0;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    color: #667eea;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: #6b7280;
    margin: 0;
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
    margin-bottom: 1rem;
  }

  .error-message,
  .empty-message {
    font-size: 1.2rem;
    color: #6b7280;
    margin: 0 0 0.5rem 0;
    font-weight: 600;
  }

  .empty-submessage {
    font-size: 1rem;
    color: #9ca3af;
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
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .favorites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 0 0.5rem;
  }

  @media (min-width: 1200px) {
    .favorites-grid {
      grid-template-columns: repeat(5, 1fr);
      gap: 1.25rem;
    }
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    .favorites-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .favorites-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
  }

  @media (min-width: 576px) and (max-width: 767px) {
    .favorites-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }

  @media (max-width: 768px) {
    .section-title {
      font-size: 2rem;
      flex-direction: column;
      gap: 0.25rem;
    }

    .favorites-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      padding: 0 0.25rem;
    }
  }
</style>
