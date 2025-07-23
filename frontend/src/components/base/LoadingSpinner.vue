<script setup lang="ts">
  type SizeType = 'small' | 'medium' | 'large';

  interface Props {
    size?: SizeType;
    text?: string;
    showText?: boolean;
    inline?: boolean;
  }

  const {
    size = 'medium',
    text = 'Loading...',
    showText = true,
    inline = false,
  } = defineProps<Props>();

  const getSizeClasses = (size: SizeType): string => {
    const sizes: Record<SizeType, string> = {
      small: 'w-4 h-4',
      medium: 'w-8 h-8',
      large: 'w-12 h-12',
    };
    return sizes[size] || sizes.medium;
  };

  const getTextSize = (size: SizeType): string => {
    const textSizes: Record<SizeType, string> = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };
    return textSizes[size] || textSizes.medium;
  };
</script>

<template>
  <div class="loading-state" :class="{ 'inline-loading': inline }">
    <div class="loading-spinner" :class="getSizeClasses(size)">
      <svg class="animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </div>
    <p v-if="showText" class="loading-text" :class="getTextSize(size)">{{ text }}</p>
  </div>
</template>

<style scoped>
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    margin: 2rem 0;
    background-color: rgb(236, 237, 242);
  }

  .loading-state.inline-loading {
    flex-direction: row;
    padding: 1rem;
    margin: 0;
    background: transparent;
    border: none;
    backdrop-filter: none;
    gap: 0.75rem;
  }

  .loading-spinner {
    color: #667eea;
    margin-bottom: 1rem;
  }

  .inline-loading .loading-spinner {
    margin-bottom: 0;
  }

  .loading-text {
    color: #6b7280;
    margin: 0;
    font-weight: 500;
  }

  .animate-spin {
    animation: spin 1s linear infinite;
    width: 100%;
    height: 100%;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Utility classes for size */
  .w-4 {
    width: 1rem;
  }
  .h-4 {
    height: 1rem;
  }
  .w-8 {
    width: 2rem;
  }
  .h-8 {
    height: 2rem;
  }
  .w-12 {
    width: 3rem;
  }
  .h-12 {
    height: 3rem;
  }

  .text-sm {
    font-size: 0.875rem;
  }
  .text-base {
    font-size: 1rem;
  }
  .text-lg {
    font-size: 1.125rem;
  }

  @media (max-width: 640px) {
    .loading-state {
      padding: 2rem 1rem;
    }

    .loading-text {
      font-size: 0.9rem;
    }
  }
</style>
