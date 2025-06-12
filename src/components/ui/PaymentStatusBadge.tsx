import React from 'react';
import { View, Text } from 'react-native';
import { PaymentStatus } from '@/types/student';
import { CircleCheck as CheckCircle, Clock, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface PaymentStatusBadgeProps {
  paymentStatus: PaymentStatus;
  size?: 'sm' | 'md';
}

export function PaymentStatusBadge({ paymentStatus, size = 'md' }: PaymentStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (paymentStatus.status) {
      case 'paid':
        return {
          label: 'Pago',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          iconColor: '#22c55e'
        };
      case 'due_soon':
        return {
          label: 'Vencimento Próximo',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          iconColor: '#f59e0b'
        };
      case 'overdue':
        return {
          label: 'Atrasado',
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: AlertTriangle,
          iconColor: '#ef4444'
        };
      default:
        return {
          label: 'Desconhecido',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          iconColor: '#6b7280'
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;
  const iconSize = size === 'sm' ? 14 : 16;
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <View className={`flex-row items-center px-2 py-1 rounded-full border ${config.color}`}>
      <IconComponent size={iconSize} color={config.iconColor} />
      <Text className={`ml-1 font-medium ${textSize}`}>
        {config.label}
      </Text>
    </View>
  );
}