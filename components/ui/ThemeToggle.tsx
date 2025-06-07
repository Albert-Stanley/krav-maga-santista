import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className={`p-2 rounded-full ${
        isDark ? 'bg-gray-700' : 'bg-gray-100'
      }`}
      activeOpacity={0.7}
    >
      {isDark ? (
        <Sun size={20} color="#f59e0b" />
      ) : (
        <Moon size={20} color="#6b7280" />
      )}
    </TouchableOpacity>
  );
}