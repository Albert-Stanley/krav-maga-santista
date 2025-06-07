import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { LoginForm } from '@/components/forms/LoginForm';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { LoginFormData } from '@/types/auth';
const logo = require('@/assets/images/logo_app.png'); // Ajuste o caminho conforme necessário

export default function Login() {
  const { login, isLoading } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Erro de Login',
        error instanceof Error ? error.message : 'Erro desconhecido',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSignUpNavigation = () => {
    router.push('/signup');
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 py-8">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full items-center justify-center mr-4">
                <Image
                  source={logo}
                  className="w-12 h-20 mb-4"
                  resizeMode="contain"
                />
              </View>
              <Text
                className={`text-xl font-inter-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Krav Maga
              </Text>
            </View>
            <ThemeToggle />
          </View>

          {/* Main Content */}
          <View className="flex-1 justify-center">
            <View className="mb-8">
              <Text
                className={`text-3xl font-inter-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Bem-vindo de volta
              </Text>
              <Text
                className={`text-lg font-inter-regular ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Entre na sua conta para continuar
              </Text>
            </View>

            <Card>
              <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            </Card>

            {/* Sign Up Link */}
            <View className="items-center mt-8">
              <Text
                className={`text-base font-inter-regular ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Não tem uma conta?{' '}
                <TouchableOpacity onPress={handleSignUpNavigation}>
                  <Text className="text-primary-600 font-inter-semibold">
                    Cadastre-se
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
