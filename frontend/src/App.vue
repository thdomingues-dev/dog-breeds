<script setup>
  import { ref } from 'vue';
  import BreedList from './components/BreedList.vue';
  import FavoritesList from './components/FavoritesList.vue';
  import DogIcon from './components/DogIcon.vue';

  const tab = ref('breeds');

  const goToHome = () => {
    tab.value = 'breeds';
  };
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="header-content">
        <div class="brand" @click="goToHome">
          <div class="logo">
            <DogIcon :size="32" />
          </div>
          <h1>Dog Breeds Explorer</h1>
        </div>
        <nav class="nav">
          <button :class="{ active: tab === 'breeds' }" @click="tab = 'breeds'" class="nav-btn">
            <span class="nav-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5S5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Breeds
          </button>
          <button
            :class="{ active: tab === 'favorites' }"
            @click="tab = 'favorites'"
            class="nav-btn"
          >
            <span class="nav-icon">
              <svg
                width="20"
                height="20"
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
            Favorites
          </button>
        </nav>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <BreedList v-if="tab === 'breeds'" />
        <FavoritesList v-else />
      </div>
    </main>
  </div>
</template>

<style scoped>
  .app {
    min-height: 100vh;
    background: rgb(236, 237, 242);
    width: 100vw;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }

  .header {
    backdrop-filter: blur(20px);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    width: 100%;
    flex-shrink: 0;
  }

  .header-content {
    max-width: none;
    width: 100%;
    margin: 0;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .brand:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }

  .logo {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #ffffff, #f0f0f0);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    color: #667eea;
  }

  .brand h1 {
    font-size: 2rem;
    font-weight: 800;
    margin: 0;
    background: linear-gradient(135deg, #ffffff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav {
    display: flex;
    gap: 0.5rem;
  }

  .nav-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .nav-btn.active {
    background: rgba(255, 255, 255, 0.9);
    color: #667eea;
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main {
    padding: 0;
    width: 100%;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgb(236, 237, 242);
  }

  .container {
    max-width: none;
    width: 100%;
    margin: 0;
    background: rgb(236, 237, 242);
    backdrop-filter: blur(10px);
    border-radius: 0;
    padding: 1rem;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
    border: none;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      text-align: center;
      padding: 1rem;
    }

    .brand h1 {
      font-size: 1.5rem;
    }

    .nav {
      width: 100%;
      justify-content: center;
    }

    .nav-btn {
      flex: 1;
      justify-content: center;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }

    .container {
      padding: 1rem;
      border-radius: 0;
    }
  }
</style>
