<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import axios, { type AxiosResponse } from 'axios';

  interface Props {
    breed?: string | null;
    show?: boolean;
  }

  interface Emits {
    (e: 'close'): void;
  }

  const { breed = null, show = false } = defineProps<Props>();

  const emit = defineEmits<Emits>();

  const images = ref<string[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  async function fetchImages(): Promise<void> {
    if (!breed || !show) return;
    loading.value = true;
    error.value = null;
    try {
      const res: AxiosResponse<string[]> = await axios.get(`/breeds/${breed}/images`);
      images.value = res.data;
    } catch (err) {
      error.value = 'Error loading images.';
    } finally {
      loading.value = false;
    }
  }

  watch(
    () => [show, breed],
    ([showVal, breedVal]) => {
      if (showVal && breedVal) {
        fetchImages();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  );
</script>

<template>
  <transition name="modal" appear>
    <div v-if="show" class="modal-backdrop" @click.self="emit('close')">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <div class="breed-info">
            <h3 class="breed-title">
              <span class="breed-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                  <path
                    d="M8.5 10C9.33 10 10 9.33 10 8.5C10 7.67 9.33 7 8.5 7C7.67 7 7 7.67 7 8.5C7 9.33 7.67 10 8.5 10Z"
                    fill="currentColor"
                  />
                  <path
                    d="M21 15L16 10L5 21"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 10L21 17"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              {{ breed }} Gallery
            </h3>
            <p class="breed-subtitle">Photos of {{ breed }}</p>
          </div>
          <button class="close-btn" @click="emit('close')" aria-label="Close modal">
            <span class="close-icon">✕</span>
          </button>
        </div>

        <div class="modal-content">
          <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p class="loading-text">Loading beautiful photos...</p>
          </div>

          <div v-else-if="error" class="error-state">
            <div class="error-icon">⚠️</div>
            <p class="error-message">{{ error }}</p>
          </div>

          <div v-else class="images-gallery">
            <div
              v-for="(img, index) in images"
              :key="img"
              class="image-container"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <img
                :src="img"
                :alt="`${breed} photo ${index + 1}`"
                class="breed-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal {
    background: white;
    border-radius: 24px;
    max-width: 90vw;
    max-height: 90vh;
    width: 100%;
    max-width: 1200px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem 1rem 0.5rem;
    border-bottom: 1px solid #f3f4f6;
  }

  .breed-info {
    flex: 1;
  }

  .breed-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    text-transform: capitalize;
    line-height: 1.2;
  }

  .breed-icon {
    display: inline-flex;
    align-self: center;
    color: #667eea;
  }

  .breed-subtitle {
    margin: 0;
    color: #6b7280;
    font-size: 1rem;
    text-transform: capitalize;
  }

  .close-btn {
    background: #f3f4f6;
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    margin-left: 1rem;
    align-self: flex-start;
  }

  .close-btn:hover {
    background: #e5e7eb;
    transform: scale(1.05);
  }

  .close-icon {
    font-size: 1.2rem;
    color: #6b7280;
    font-weight: 600;
  }

  .modal-content {
    flex: 1;
    overflow-y: auto;
    padding: 0.75rem 1rem 1rem;
  }

  .loading-state,
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
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
    margin: 0;
    color: #6b7280;
    font-size: 1.1rem;
  }

  .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .error-message {
    margin: 0;
    color: #6b7280;
    font-size: 1.1rem;
  }

  .images-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 0.5rem 0;
  }

  @media (min-width: 1024px) {
    .images-gallery {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .images-gallery {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
  @media (max-width: 768px) {
    .modal {
      margin: 0.5rem;
      height: calc(100vh - 1rem);
    }
    .modal-header {
      padding: 0.75rem 0.75rem 0.5rem;
    }
    .modal-content {
      padding: 0.5rem 0.75rem 0.75rem;
    }
    .images-gallery {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      padding: 0.25rem 0;
    }
  }
  @media (max-width: 480px) {
    .modal-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    .close-btn {
      align-self: flex-start;
      margin: 0;
    }
    .images-gallery {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }

  .image-container {
    position: relative;
    aspect-ratio: 1;
    border-radius: 16px;
    overflow: hidden;
    background: #f3f4f6;
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
    transform: translateY(20px);
  }

  .breed-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    border-radius: 12px;
  }

  .image-container:hover .breed-image {
    transform: scale(1.02);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Modal transitions */
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.3s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }

  .modal-backdrop.modal-enter-from,
  .modal-backdrop.modal-leave-to {
    backdrop-filter: blur(0px);
  }

  @media (max-width: 768px) {
    .modal-backdrop {
      align-items: flex-start;
      padding: 0.5rem;
      padding-top: 1rem;
    }

    .modal {
      margin: 0;
      min-height: fit-content;
      height: auto;
      max-height: calc(100vh - 2rem);
      width: 100%;
      overflow-y: visible;
    }

    .modal-header {
      padding: 1.5rem 1.5rem 1rem;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }

    .close-btn {
      margin: 0;
      flex-shrink: 0;
    }

    .modal-content {
      padding: 1rem 1.5rem 1.5rem;
    }

    .breed-title {
      font-size: 1.5rem;
    }

    .images-gallery {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .modal-header {
      padding: 1rem 1rem 0.75rem;
    }

    .close-btn {
      width: 36px;
      height: 36px;
    }

    .images-gallery {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>
