export interface User {
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
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}