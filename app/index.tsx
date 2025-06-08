import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
const logoSplash = require('../assets/images/splash.png');

export default function SplashScreen() {
  const { isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <View
      className={`flex-1 items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <View className="items-center">
        {/* Logo  */}
        <Image
          source={logoSplash}
          className="w-32 h-32 mb-4 rounded-full"
          resizeMode="contain"
        />

        <Text
          className={`text-3xl font-inter-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          Academia Krav Maga
        </Text>

        <Text
          className={`text-lg font-inter-regular ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Defesa pessoal e condicionamento
        </Text>
      </View>
    </View>
  );
}
