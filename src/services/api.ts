// src/services/api.ts
import axios from 'axios';
import { useAuthStore } from '@/store/auth'; // Importamos a store de auth

// Substitua pela URL do seu backend no Railway
const API_URL = 'https://seu-backend-url.railway.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🚀 Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    // Pega o token do estado da store de autenticação
    const token = useAuthStore.getState().token;
    if (token) {
      // Adiciona o token no cabeçalho 'Authorization'
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
