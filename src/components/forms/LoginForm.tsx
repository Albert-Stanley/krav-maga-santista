import React from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LoginFormData } from '@/types/auth';
import { useThemeStore } from '@/store/theme';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <View className="space-y-4">
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              placeholder="seu@email.com"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
        />
      </View>

      <View>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Senha"
              placeholder="Sua senha"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              secureTextEntry
            />
          )}
        />
      </View>

      <View className="pt-4">
        <Button
          title="Entrar"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>

      <View className="items-center pt-4">
        <Text className={`text-sm font-inter-regular ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Use qualquer email e senha para entrar (demo)
        </Text>
      </View>
    </View>
  );
}