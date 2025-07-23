<script setup lang="ts">
  type IconType = 'heart' | 'search' | 'error';

  interface Props {
    icon?: IconType;
    title: string;
    subtitle?: string;
    showAction?: boolean;
    actionText?: string;
  }

  interface Emits {
    (e: 'action-click'): void;
  }

  const {
    icon = 'heart',
    title,
    subtitle = '',
    showAction = false,
    actionText = 'Try again',
  } = defineProps<Props>();

  defineEmits<Emits>();

  interface IconConfig {
    viewBox: string;
    path: string;
    fill: string;
  }

  const getIcon = (iconType: IconType): IconConfig => {
    const icons: Record<IconType, IconConfig> = {
      heart: {
        viewBox: '0 0 24 24',
        path: 'M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.04C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z',
        fill: '#e5e7eb',
      },
      search: {
        viewBox: '0 0 24 24',
        path: 'M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z',
        fill: '#e5e7eb',
      },
      error: {
        viewBox: '0 0 24 24',
        path: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z',
        fill: '#ef4444',
      },
    };
    return icons[iconType] || icons.heart;
  };
</script>

<template>
  <div class="empty-state">
    <div class="empty-icon">
      <svg
        width="64"
        height="64"
        :viewBox="getIcon(icon).viewBox"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path :d="getIcon(icon).path" :fill="getIcon(icon).fill" />
      </svg>
    </div>
    <p class="empty-message">{{ title }}</p>
    <p v-if="subtitle" class="empty-submessage">{{ subtitle }}</p>
    <button v-if="showAction" @click="$emit('action-click')" class="action-btn">
      {{ actionText }}
    </button>
  </div>
</template>

<style scoped>
  .empty-state {
    text-align: center;
    padding: 3rem 1.5rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    margin: 2rem 0;
  }

  .empty-icon {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    opacity: 0.8;
  }

  .empty-message {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 0.5rem 0;
  }

  .empty-submessage {
    font-size: 1rem;
    color: #6b7280;
    margin: 0 0 1.5rem 0;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  .action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  @media (max-width: 640px) {
    .empty-state {
      padding: 2rem 1rem;
    }

    .empty-message {
      font-size: 1.125rem;
    }

    .empty-submessage {
      font-size: 0.9rem;
    }
  }
</style>
