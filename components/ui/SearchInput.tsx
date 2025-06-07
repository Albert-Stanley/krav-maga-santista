import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export function SearchInput({ 
  value, 
  onChangeText, 
  placeholder = 'Pesquisar...', 
  onClear 
}: SearchInputProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <View className={`flex-row items-center rounded-lg px-4 py-3 ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <Search size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
      
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
        className={`flex-1 ml-3 text-base ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      />
      
      {value.length > 0 && onClear && (
        <TouchableOpacity onPress={onClear} className="ml-2">
          <X size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
        </TouchableOpacity>
      )}
    </View>
  );
}