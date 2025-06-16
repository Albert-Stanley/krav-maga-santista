// src/store/students.ts
import { create } from 'zustand';
import { User } from '@/types/auth'; // Reutilizamos o tipo User que já existe
import api from '@/services/api'; // Importamos o serviço de API

// Tipos para as funções de CRUD
type CreateUserData = Omit<User, 'id' | 'joinDate' | 'isActive'>; // Dados para criar um novo usuário
type UpdateUserData = Partial<User>; // Dados para atualizar um usuário

interface UsersState {
  users: User[]; // Lista de todos os usuários do backend
  filteredUsers: User[]; // Lista filtrada para exibição
  searchQuery: string;
  isLoading: boolean;
}

interface UsersActions {
  fetchUsers: () => Promise<void>; // R - Read
  createUser: (userData: CreateUserData) => Promise<void>; // C - Create
  updateUser: (userId: string, updates: UpdateUserData) => Promise<void>; // U - Update
  deleteUser: (userId: string) => Promise<void>; // D - Delete
  setSearchQuery: (query: string) => void;
  applyFilters: () => void;
  getUserById: (userId: string) => User | undefined; // Função para obter um usuário pelo ID
}

type UsersStore = UsersState & UsersActions;

export const useUsersStore = create<UsersStore>((set, get) => ({
  // State
  users: [],
  filteredUsers: [],
  searchQuery: '',
  isLoading: false,

  // Actions (CRUD)
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      // Endpoint para buscar todos os usuários (GET /Users)
      const response = await api.get<User[]>('/Users');
      set({ users: response.data });
      get().applyFilters(); // Aplica filtros após buscar os dados
    } catch (error) {
      console.error('Falha ao buscar usuários:', error);
      // Opcional: tratar o erro na UI
    } finally {
      set({ isLoading: false });
    }
  },

  createUser: async (userData) => {
    try {
      // Endpoint para criar um usuário (POST /Users)
      const response = await api.post<User>('/Users', userData);
      // Adiciona o novo usuário à lista local para não precisar de um novo fetch
      set((state) => ({
        users: [...state.users, response.data],
      }));
      get().applyFilters();
    } catch (error) {
      console.error('Falha ao criar usuário:', error);
      throw error; // Propaga o erro para a UI
    }
  },

  updateUser: async (userId, updates) => {
    try {
      // Endpoint para atualizar um usuário (PUT /Users/{id})
      const response = await api.put<User>(`/Users/${userId}`, updates);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? response.data : user
        ),
      }));
      get().applyFilters();
    } catch (error) {
      console.error('Falha ao atualizar usuário:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      // Endpoint para deletar um usuário (DELETE /Users/{id})
      await api.delete(`/Users/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
      }));
      get().applyFilters();
    } catch (error) {
      console.error('Falha ao deletar usuário:', error);
      throw error;
    }
  },

  getUserById: (userId: string) => {
    return get().users.find((user) => user.id === userId);
  },
  // Actions de filtro (permanecem locais)
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  applyFilters: () => {
    const { users, searchQuery } = get();
    let filtered = [...users];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    set({ filteredUsers: filtered });
  },
}));
