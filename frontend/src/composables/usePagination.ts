import { ref, computed, type Ref, type ComputedRef } from 'vue';
import type { PaginationMeta, PaginationParams } from '@/types/api';

interface PaginationComposable {
  currentPage: Ref<number>;
  itemsPerPage: Ref<number>;
  totalPages: Ref<number>;
  totalItems: Ref<number>;
  hasNextPage: Ref<boolean>;
  hasPreviousPage: Ref<boolean>;
  pageNumbers: ComputedRef<number[]>;
  goToPage: (page: number, callback?: () => void) => void;
  nextPage: (callback?: () => void) => void;
  prevPage: (callback?: () => void) => void;
  resetToFirstPage: () => void;
  updatePaginationMeta: (meta: PaginationMeta) => void;
  getPaginationParams: () => PaginationParams;
}

export function usePagination(): PaginationComposable {
  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(10);
  const totalPages = ref<number>(0);
  const totalItems = ref<number>(0);
  const hasNextPage = ref<boolean>(false);
  const hasPreviousPage = ref<boolean>(false);

  const goToPage = (page: number, callback?: () => void): void => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      if (callback) callback();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextPage = (callback?: () => void): void => {
    if (hasNextPage.value) {
      goToPage(currentPage.value + 1, callback);
    }
  };

  const prevPage = (callback?: () => void): void => {
    if (hasPreviousPage.value) {
      goToPage(currentPage.value - 1, callback);
    }
  };

  const resetToFirstPage = (): void => {
    currentPage.value = 1;
  };

  const pageNumbers = computed<number[]>(() => {
    const pages: number[] = [];
    const total = totalPages.value;
    const current = currentPage.value;
    const maxPages = 5;

    let start = Math.max(1, current - Math.floor(maxPages / 2));
    let end = Math.min(total, current + Math.floor(maxPages / 2));

    if (end - start < maxPages - 1) {
      if (start === 1) {
        end = Math.min(total, start + maxPages - 1);
      } else if (end === total) {
        start = Math.max(1, end - maxPages + 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  const updatePaginationMeta = (meta: PaginationMeta): void => {
    totalPages.value = meta.totalPages;
    totalItems.value = meta.totalItems;
    hasNextPage.value = meta.hasNextPage;
    hasPreviousPage.value = meta.hasPreviousPage;
  };

  const getPaginationParams = (): PaginationParams => {
    return {
      page: currentPage.value,
      limit: itemsPerPage.value,
    };
  };

  return {
    currentPage,
    itemsPerPage,
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
  };
}
