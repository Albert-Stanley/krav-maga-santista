export interface User {
  faixa: any;
  sobrenome: any;
  id: string;
  name: string;
  email: string;
  phone?: string;
  birthDate?: string;
  membershipLevel: 'beginner' | 'intermediate' | 'advanced' | 'instructor';
  joinDate: string;
  isActive: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  name: string;
  sobrenome?: string;
  email: string;
  password: string;
  confirmPassword: string;
  faixa: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
