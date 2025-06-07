import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useThemeStore } from '@/store/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const getButtonClasses = () => {
    const base = 'rounded-lg flex-row items-center justify-center';
    
    const variants = {
      primary: isDark 
        ? 'bg-primary-600 border border-primary-600' 
        : 'bg-primary-600 border border-primary-600',
      secondary: isDark 
        ? 'bg-gray-700 border border-gray-600' 
        : 'bg-gray-100 border border-gray-200',
      outline: isDark 
        ? 'bg-transparent border border-gray-600' 
        : 'bg-transparent border border-gray-300',
    };

    const sizes = {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
    };

    const disabledClass = disabled || loading ? 'opacity-50' : '';

    return `${base} ${variants[variant]} ${sizes[size]} ${disabledClass}`;
  };

  const getTextClasses = () => {
    const base = 'font-inter-semibold';
    
    const variants = {
      primary: 'text-white',
      secondary: isDark ? 'text-gray-200' : 'text-gray-900',
      outline: isDark ? 'text-gray-200' : 'text-gray-900',
    };

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    return `${base} ${variants[variant]} ${sizes[size]}`;
  };

  return (
    <TouchableOpacity
      className={getButtonClasses()}
      onPress={onPress}
      disabled={disabled || loading}
      style={style}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#fff' : isDark ? '#e5e7eb' : '#374151'}
          style={{ marginRight: 8 }}
        />
      )}
      <Text className={getTextClasses()} style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}