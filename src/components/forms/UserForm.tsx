// src/components/forms/UserForm.tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input'; // Supondo que você tenha um componente de Input

// Esquema de validação com Zod
const userSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  sobrenome: z.string().optional(),
  email: z.string().email('Email inválido.'),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres.')
    .optional(),
  faixa: z.string().min(1, 'A faixa é obrigatória.'),
});

// Remove a senha se não for fornecida (útil para edição)
const userSchemaEdit = userSchema.transform((data) => {
  if (data.password === '' || data.password === undefined) {
    const { password, ...rest } = data;
    return rest;
  }
  return data;
});

export type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  initialData?: Partial<UserFormData>;
  isLoading: boolean;
  isEditMode?: boolean;
}

export function UserForm({
  onSubmit,
  initialData,
  isLoading,
  isEditMode = false,
}: UserFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(isEditMode ? userSchemaEdit : userSchema),
    defaultValues: initialData || {
      name: '',
      sobrenome: '',
      email: '',
      password: '',
      faixa: '',
    },
  });

  return (
    <View className="space-y-4">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Nome"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="sobrenome"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Sobrenome"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.sobrenome?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="faixa"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Faixa"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.faixa?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={isEditMode ? 'Nova Senha (opcional)' : 'Senha'}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />

      <Button
        title={isLoading ? 'Salvando...' : 'Salvar'}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </View>
  );
}
