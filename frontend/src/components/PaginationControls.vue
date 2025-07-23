<script setup lang="ts">
  interface Props {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    pageNumbers: number[];
  }

  interface Emits {
    (e: 'page-change', page: number): void;
    (e: 'next-page'): void;
    (e: 'prev-page'): void;
  }

  const { currentPage, totalPages, hasNextPage, hasPreviousPage, pageNumbers } =
    defineProps<Props>();

  defineEmits<Emits>();
</script>

<template>
  <div v-if="totalPages > 1" class="pagination-container">
    <div class="pagination-controls">
      <button
        @click="$emit('prev-page')"
        :disabled="!hasPreviousPage"
        class="pagination-btn prev-next-btn"
        title="Previous page"
      >
        <span class="pagination-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span class="btn-text">Previous</span>
      </button>

      <div class="page-numbers">
        <button
          v-for="page in pageNumbers"
          :key="page"
          @click="$emit('page-change', page)"
          class="pagination-btn page-btn"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="$emit('next-page')"
        :disabled="!hasNextPage"
        class="pagination-btn prev-next-btn"
        title="Next page"
      >
        <span class="btn-text">Next</span>
        <span class="pagination-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
  .pagination-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 3rem;
    padding: 1.5rem;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .page-numbers {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .pagination-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #374151;
    line-height: 1.2;
    vertical-align: middle;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .pagination-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.95);
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .pagination-btn.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  .pagination-btn.active:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
    transform: none;
  }

  .page-btn {
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 12px;
  }

  .pagination-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    line-height: 1;
    font-size: 0px;
  }

  @media (max-width: 768px) {
    .pagination-container {
      padding: 0rem;
      padding-bottom: 1rem;
      margin-top: 2rem;
    }

    .prev-next-btn {
      padding: 0.5rem;
      min-width: 44px;
    }

    .prev-next-btn .btn-text {
      display: none;
    }

    .page-btn {
      width: 40px;
      height: 40px;
      font-size: 0.875rem;
      padding: 0;
    }

    .pagination-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
  }

  @media (max-width: 480px) {
    .page-numbers {
      gap: 0.125rem;
    }

    .page-btn {
      width: 36px;
      height: 36px;
      font-size: 0.8rem;
    }
  }
</style>
