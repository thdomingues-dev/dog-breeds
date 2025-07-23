<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useDebounce } from '../composables/useDebounce';

  interface Props {
    modelValue?: string;
    placeholder?: string;
    delay?: number;
  }

  interface Emits {
    (e: 'update:modelValue', value: string): void;
    (e: 'search', value: string): void;
  }

  const { modelValue = '', placeholder = 'Search...', delay = 300 } = defineProps<Props>();

  const emit = defineEmits<Emits>();

  const localValue = ref<string>(modelValue);

  watch(
    () => modelValue,
    (newValue: string) => {
      localValue.value = newValue;
    }
  );

  const { debouncedFunction } = useDebounce((value: string) => {
    emit('search', value);
  }, delay);

  watch(localValue, (newValue: string) => {
    emit('update:modelValue', newValue);
    debouncedFunction(newValue);
  });

  const clearSearch = (): void => {
    localValue.value = '';
  };
</script>

<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <div class="search-icon">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <input v-model="localValue" type="text" :placeholder="placeholder" class="search-input" />
      <button v-if="localValue" @click="clearSearch" class="clear-btn" title="Clear search">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
  .search-container {
    margin-bottom: 2rem;
  }

  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 0.75rem 1rem;
    transition: all 0.3s ease;
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.08),
      0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .search-input-wrapper:focus-within {
    border-color: #667eea;
    box-shadow:
      0 0 0 3px rgba(102, 126, 234, 0.1),
      0 4px 12px rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 0.95);
  }

  .search-icon {
    color: #6b7280;
    margin-right: 0.75rem;
    flex-shrink: 0;
  }

  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 1rem;
    color: #1f2937;
    outline: none;
    margin-right: 0.5rem;
  }

  .search-input::placeholder {
    color: #9ca3af;
  }

  .clear-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 6px;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .clear-btn:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #374151;
  }

  @media (max-width: 640px) {
    .search-input-wrapper {
      padding: 0.625rem 0.875rem;
    }

    .search-input {
      font-size: 0.9rem;
    }
  }
</style>
