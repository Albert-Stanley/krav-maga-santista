import React from 'react';
import { View, Text } from 'react-native';
import { Rank } from '@/types/student';
import { useThemeStore } from '@/store/theme';

interface RankBadgeProps {
  rank: Rank;
  size?: 'sm' | 'md' | 'lg';
  showLevel?: boolean;
}

export function RankBadge({ rank, size = 'md', showLevel = false }: RankBadgeProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <View className="flex-row items-center">
      <View 
        className={`${sizeClasses[size]} rounded-full border-2 ${
          isDark ? 'border-gray-600' : 'border-gray-300'
        }`}
        style={{ backgroundColor: rank.color }}
      />
      {showLevel && (
        <Text className={`ml-2 font-medium ${textSizes[size]} ${
          isDark ? 'text-gray-200' : 'text-gray-700'
        }`}>
          {rank.name}
        </Text>
      )}
    </View>
  );
}