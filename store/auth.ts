import { create } from 'zustand';
import dayjs from 'dayjs';
import { AuthState, LoginFormData, SignUpFormData } from '@/types/auth';
import { Student } from '@/types/student';
import { mockRanks, currentUser } from '@/data/mockData';

// Mock de usuário autenticado (para simulação)
const mockAuthenticatedUser: Student = currentUser;

// Estado da store de autenticação com tipo personalizado para incluir Student
interface AuthStateWithStudent extends Omit<AuthState, 'user'> {
  user: Student | null;
}

interface AuthStore extends AuthStateWithStudent {
  login: (data: LoginFormData) => Promise<void>;
  signUp: (data: SignUpFormData) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Estado inicial
  user: null,
  isAuthenticated: false,
  isLoading: false,

  // Função de login simulada
  login: async (data: LoginFormData) => {
    set({ isLoading: true });

    // Simula uma chamada de API com atraso
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Verificação simples (em produção haveria verificação real)
    if (data.email && data.password) {
      set({
        user: mockAuthenticatedUser, // Usa mock do usuário Student
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({ isLoading: false });
      throw new Error('Email e senha são obrigatórios');
    }
  },

  // Função de cadastro simulada
  signUp: async (data: SignUpFormData) => {
    set({ isLoading: true });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Criação de novo usuário com dados padrões
    const newUser: Student = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      birthDate: data.birthDate,
      joinDate: new Date().toISOString().split('T')[0],
      isActive: true,
      rank: mockRanks[0], // Faixa Branca como padrão
      paymentStatus: {
        status: 'paid',
        lastPaymentDate: dayjs().format('YYYY-MM-DD'),
        amount: 150,
      },
      nextPaymentDate: dayjs().add(30, 'days').format('YYYY-MM-DD'),
      monthlyFee: 150,
    };

    set({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  // Função de logout
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  // Controle manual de loading
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
