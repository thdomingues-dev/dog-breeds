# 🐶 Dog Breeds Explorer

> Modern full-stack application for exploring dog breeds with favorites management

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=flat&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

## ⚡ Quick Start

### 🌐 Production Links

- **Frontend:** [https://dog-breeds-frontend-w82y.onrender.com](https://dog-breeds-frontend-w82y.onrender.com)
- **Backend/API:** [https://dog-breeds-d37t.onrender.com](https://dog-breeds-d37t.onrender.com)
- **Swagger Docs:** [https://dog-breeds-d37t.onrender.com/api/docs](https://dog-breeds-d37t.onrender.com/api/docs)

> **Note:**
> The services are hosted on Render's free account, so they may "sleep" after periods of inactivity. The first request after a while can take up to 15/30 seconds to respond while the service starts. Just wait and refresh if needed.

### 🐳 Docker (Recommended)

```bash
git clone https://github.com/thdomingues-dev/dog-breeds.git
cd dog-breeds
docker-compose up --build
```

**Access:** http://localhost (Frontend) | http://localhost:3000/api (Backend)

### 🛠️ Local Development

**Prerequisites:** Node.js 18+, npm

```bash
# 1. Backend (Terminal 1)
cd backend
npm install
npm run start:dev          # http://localhost:3000

# 2. Frontend (Terminal 2) 
cd frontend
npm install
npm run dev               # http://localhost:5173
```

## 🏗️ Architecture

### Backend (NestJS + TypeScript)
- **REST API** with Swagger docs
- **Caching** (5min TTL) for external API calls
- **Rate limiting** and request logging
- **File-based persistence** for favorites
- **Health checks** for monitoring

### Frontend (Vue 3 + TypeScript)
- **Composition API** with modern patterns
- **Responsive design** (mobile-first)
- **Real-time search** with debouncing
- **State management** with composables
- **Optimized builds** with Vite

## 📋 Features

-  **Browse dog breeds** from Dog CEO API
-  **Search & filter** breeds in real-time
-  **Favorites system** with persistence
-  **Image modal** with breed photos
-  **Responsive design** for all devices
-  **Loading & error states** throughout
-  **Docker containerization** ready

## 📁 Project Structure

```
dog-breeds/
├── backend/           # NestJS API server
│   ├── src/breeds/    # Breeds module + caching
│   ├── src/favorites/ # Favorites management
│   └── src/health/    # Health check endpoint
├── frontend/          # Vue 3 application
│   ├── src/components/# UI components
│   ├── src/composables/# Reusable logic
│   └── src/types/     # TypeScript definitions
├── docker-compose.yml # Local development
└── render.yaml       # Production deployment
```

## 🧪 API Documentation

**Swagger UI:** http://localhost:3000/api/docs

**Key endpoints:**
- `GET /api/breeds` - List all breeds with pagination
- `GET /api/breeds/:name/images` - Get breed images
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:name` - Remove favorite

## 📝 License

This project is licensed under the MIT License.

---

**Made with Vue 3, NestJS, and TypeScript** 
