import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, UserPlus } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { SignUpForm } from '@/components/forms/SignUpForm';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { SignUpFormData } from '@/types/auth';

export default function SignUp() {
  const { signUp, isLoading } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      await signUp(data);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Erro no Cadastro',
        error instanceof Error ? error.message : 'Erro desconhecido',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBackNavigation = () => {
    router.back();
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
              <TouchableOpacity
                onPress={handleBackNavigation}
                className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <ArrowLeft size={20} color={isDark ? '#e5e7eb' : '#374151'} />
              </TouchableOpacity>
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary-600 rounded-full items-center justify-center mr-3">
                  <UserPlus size={20} color="#fff" />
                </View>
                <Text className={`text-xl font-inter-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Cadastro
                </Text>
              </View>
            </View>
            <ThemeToggle />
          </View>

          {/* Main Content */}
          <View className="flex-1">
            <View className="mb-8">
              <Text className={`text-3xl font-inter-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Criar conta
              </Text>
              <Text className={`text-lg font-inter-regular ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Junte-se à nossa academia e comece sua jornada no Krav Maga
              </Text>
            </View>

            <Card>
              <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
            </Card>

            {/* Login Link */}
            <View className="items-center mt-8 mb-4">
              <Text className={`text-base font-inter-regular ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Já tem uma conta?{' '}
                <TouchableOpacity onPress={handleBackNavigation}>
                  <Text className="text-primary-600 font-inter-semibold">
                    Faça login
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