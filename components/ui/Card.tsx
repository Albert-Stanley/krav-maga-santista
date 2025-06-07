import React from 'react';
import { View, ViewProps } from 'react-native';
import { useThemeStore } from '@/store/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, style, ...props }: CardProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const getCardClasses = () => {
    const base = 'rounded-xl p-6 shadow-lg';
    const variant = isDark
      ? 'bg-gray-800 border border-gray-700'
      : 'bg-white border border-gray-100';

    return `${base} ${variant}`;
  };

  return (
    <View className={getCardClasses()} style={style} {...props}>
      {children}
    </View>
  );
}