export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  birthDate?: string;
  rank: Rank;
  joinDate: string;
  isActive: boolean;
  paymentStatus: PaymentStatus;
  nextPaymentDate: string;
  monthlyFee: number;
  address?: Address;
  emergencyContact?: EmergencyContact;
}

export interface Rank {
  id: string;
  name: string;
  level: number;
  color: string;
  description: string;
}

export interface PaymentStatus {
  status: 'paid' | 'due_soon' | 'overdue';
  lastPaymentDate?: string;
  amount: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}