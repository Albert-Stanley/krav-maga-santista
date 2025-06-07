import React from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SignUpFormData } from '@/types/auth';
import { useThemeStore } from '@/store/theme';

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  phone: z
    .string()
    .min(10, 'Telefone inválido')
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato: (11) 99999-9999'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z
    .string()
    .min(6, 'Confirmação de senha é obrigatória'),
  birthDate: z
    .string()
    .min(1, 'Data de nascimento é obrigatória')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato: DD/MM/AAAA'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => void;
  isLoading?: boolean;
}

export function SignUpForm({ onSubmit, isLoading }: SignUpFormProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
    },
  });

  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return text;
  };

  const formatDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);
    if (match) {
      return `${match[1]}/${match[2]}/${match[3]}`;
    }
    return text;
  };

  return (
    <View className="space-y-4">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Nome Completo"
            placeholder="Seu nome completo"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.name?.message}
            autoCapitalize="words"
          />
        )}
      />

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

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Telefone"
            placeholder="(11) 99999-9999"
            value={value}
            onChangeText={(text) => onChange(formatPhone(text))}
            onBlur={onBlur}
            error={errors.phone?.message}
            keyboardType="phone-pad"
            maxLength={15}
          />
        )}
      />

      <Controller
        control={control}
        name="birthDate"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Data de Nascimento"
            placeholder="DD/MM/AAAA"
            value={value}
            onChangeText={(text) => onChange(formatDate(text))}
            onBlur={onBlur}
            error={errors.birthDate?.message}
            keyboardType="numeric"
            maxLength={10}
          />
        )}
      />

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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.confirmPassword?.message}
            secureTextEntry
          />
        )}
      />

      <View className="pt-4">
        <Button
          title="Criar Conta"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}