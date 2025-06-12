import React, { forwardRef } from 'react';
import {
  TextInput,
  View,
  Text,
  TextInputProps,
} from 'react-native';
import { useThemeStore } from '@/store/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, helperText, style, ...props }, ref) => {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    const getInputClasses = () => {
      const base = 'rounded-lg px-4 py-3 text-base font-inter-regular border';
      const variant = isDark
        ? 'bg-gray-800 border-gray-600 text-gray-100'
        : 'bg-white border-gray-300 text-gray-900';
      const errorClass = error
        ? 'border-red-500'
        : 'focus:border-primary-500';

      return `${base} ${variant} ${errorClass}`;
    };

    const getLabelClasses = () => {
      const base = 'text-sm font-inter-medium mb-2';
      const color = isDark ? 'text-gray-200' : 'text-gray-700';
      return `${base} ${color}`;
    };

    const getErrorClasses = () => {
      return 'text-sm font-inter-regular text-red-500 mt-1';
    };

    const getHelperClasses = () => {
      const base = 'text-sm font-inter-regular mt-1';
      const color = isDark ? 'text-gray-400' : 'text-gray-600';
      return `${base} ${color}`;
    };

    return (
      <View>
        {label && (
          <Text className={getLabelClasses()}>{label}</Text>
        )}
        <TextInput
          ref={ref}
          className={getInputClasses()}
          placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          style={style}
          {...props}
        />
        {error && (
          <Text className={getErrorClasses()}>{error}</Text>
        )}
        {helperText && !error && (
          <Text className={getHelperClasses()}>{helperText}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';