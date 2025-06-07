import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useThemeStore } from '@/store/theme';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export function FilterChip({ label, isSelected, onPress }: FilterChipProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full border ${
        isSelected
          ? 'bg-primary-600 border-primary-600'
          : isDark
          ? 'bg-gray-800 border-gray-600'
          : 'bg-white border-gray-300'
      }`}
    >
      <Text className={`text-sm font-medium ${
        isSelected
          ? 'text-white'
          : isDark
          ? 'text-gray-200'
          : 'text-gray-700'
      }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}