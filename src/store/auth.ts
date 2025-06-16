import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '@/services/api';
import { AuthState, LoginFormData, SignUpFormData, User } from '@/types/auth';
import { secureStorageAdapter } from './storage';

// O backend deve retornar o usuário e um token
interface AuthResponse {
  user: User;
  token: string;
}

interface AuthStore extends AuthState {
  token: string | null; // Adicionamos o estado do token
  login: (data: LoginFormData) => Promise<void>;
  signUp: (data: SignUpFormData) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

// Usaremos o middleware 'persist' para que o login não seja perdido ao fechar o app
export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      // Estado inicial
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Função de login atualizada
      login: async (data: LoginFormData) => {
        set({ isLoading: true });
        try {
          const response = await api.post<AuthResponse>('/login', data);
          const { user, token } = response.data;

          set({ user, token, isAuthenticated: true });
        } catch (error) {
          console.error('Falha no login:', error);
          throw new Error('Email ou senha inválidos.');
        } finally {
          set({ isLoading: false });
        }
      },

      // Função de cadastro atualizada
      signUp: async (data: SignUpFormData) => {
        set({ isLoading: true });
        try {
          const payload = {
            Nome: data.name,
            Sobrenome: data.sobrenome,
            Email: data.email,
            Password: data.password,
            Faixa: data.faixa,
          };
          const response = await api.post<AuthResponse>('/Users', payload);
          const { user, token } = response.data;

          set({ user, token, isAuthenticated: true });
        } catch (error) {
          console.error('Falha no cadastro:', error);
          throw new Error('Não foi possível realizar o cadastro.');
        } finally {
          set({ isLoading: false });
        }
      },

      // Logout agora também limpa o token
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage', // Nome da chave no AsyncStorage
      storage: createJSONStorage(() => secureStorageAdapter),
      partialize: (state) => ({
        user: state.user ?? null,
        token: state.token ?? null,
        isAuthenticated: state.isAuthenticated ?? false,
        isLoading: false,
        login: state.login,
        signUp: state.signUp,
        logout: state.logout,
        setLoading: state.setLoading,
      }), // Escolhe quais partes do estado persistir
    }
  )
);
