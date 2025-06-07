import { create } from 'zustand';
import { AuthState, User, LoginFormData, SignUpFormData } from '@/types/auth';

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '(11) 99999-9999',
  birthDate: '1990-05-15',
  membershipLevel: 'intermediate',
  joinDate: '2023-01-15',
  isActive: true,
};

interface AuthStore extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  signUp: (data: SignUpFormData) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (data: LoginFormData) => {
    set({ isLoading: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication - accept any email/password for demo
    if (data.email && data.password) {
      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({ isLoading: false });
      throw new Error('Email e senha são obrigatórios');
    }
  },

  signUp: async (data: SignUpFormData) => {
    set({ isLoading: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock registration - create user with provided data
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      birthDate: data.birthDate,
      membershipLevel: 'beginner',
      joinDate: new Date().toISOString().split('T')[0],
      isActive: true,
    };

    set({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));