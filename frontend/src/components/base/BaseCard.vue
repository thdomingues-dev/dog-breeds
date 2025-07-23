<script setup lang="ts">
  interface Props {
    title: string;
    showFavoriteButton?: boolean;
    isFavorite?: boolean;
    showRemoveButton?: boolean;
    loading?: boolean;
  }

  interface Emits {
    (e: 'favorite-click'): void;
    (e: 'remove-click'): void;
    (e: 'card-click'): void;
  }

  const {
    title,
    showFavoriteButton = true,
    isFavorite = false,
    showRemoveButton = false,
    loading = false,
  } = defineProps<Props>();

  defineEmits<Emits>();
</script>

<template>
  <div class="breed-card" @click="$emit('card-click')">
    <div class="card-header">
      <h3 class="breed-name">{{ title }}</h3>
      <div class="card-actions">
        <button
          v-if="showFavoriteButton"
          @click.stop="$emit('favorite-click')"
          class="favorite-btn"
          :class="{ active: isFavorite }"
          :disabled="loading"
          :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          <span class="favorite-icon">
            <svg
              v-if="loading"
              class="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                :fill="isFavorite ? '#fbbf24' : 'none'"
                :stroke="isFavorite ? '#fbbf24' : 'currentColor'"
                stroke-width="2"
              />
            </svg>
          </span>
        </button>

        <button
          v-if="showRemoveButton"
          @click.stop="$emit('remove-click')"
          class="remove-btn"
          :disabled="loading"
          title="Remove from favorites"
        >
          <span class="remove-icon">
            <svg
              v-if="loading"
              class="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 7L18.1307 19.1425C18.0598 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94017 20.1891 5.86931 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>

    <div class="card-content"></div>
  </div>
</template>

<style scoped>
  .breed-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 1.25rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.05);
    height: 120px;
    display: flex;
    flex-direction: column;
    /* Remove mobile tap highlight */
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .breed-card:hover {
    transform: translateY(-4px);
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.15),
      0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.95);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    min-height: 40px;
  }

  .breed-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #667eea;
    margin: 0;
    text-transform: capitalize;
    line-height: 1.2;
    flex: 1;
    margin-right: 0.5rem;
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .favorite-btn,
  .remove-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.8);
    color: #6b7280;
    /* Remove mobile tap highlight */
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .favorite-btn:hover,
  .remove-btn:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.05);
  }

  .favorite-btn.active {
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.1);
  }

  .favorite-btn.active:hover {
    background: rgba(251, 191, 36, 0.2);
  }

  .remove-btn {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }

  .remove-btn:hover {
    background: rgba(239, 68, 68, 0.2);
  }

  .favorite-btn:disabled,
  .remove-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .favorite-icon,
  .remove-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 640px) {
    .breed-card {
      height: 100px;
      padding: 1rem;
    }

    .breed-name {
      font-size: 1.25rem;
    }
  }
</style>
