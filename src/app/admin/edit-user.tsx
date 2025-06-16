// src/app/admin/edit-user.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { UserForm, UserFormData } from '@/components/forms/UserForm';
import { useUsersStore } from '@/store/students';

export default function EditUserScreen() {
  const { updateUser, getUserById } = useUsersStore();
  const [isLoading, setIsLoading] = useState(false);

  // Pega o ID do usuário da URL: /admin/edit-user?id=123
  const { id } = useLocalSearchParams<{ id: string }>();

  const user = useMemo(
    () => (id ? getUserById(id) : undefined),
    [id, getUserById]
  );

  const handleUpdateUser = async (data: UserFormData) => {
    if (!id) return;
    setIsLoading(true);
    try {
      // Mapeia os dados do formulário para o que o backend espera
      const payload = {
        name: data.name,
        sobrenome: data.sobrenome,
        email: data.email,
        password: data.password, // Se for undefined (opcional), o backend não deve atualizar
        faixa: data.faixa,
      };

      await updateUser(id, payload);
      Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator />
        <Text>Carregando usuário...</Text>
      </SafeAreaView>
    );
  }

  // Prepara os dados iniciais para o formulário
  const initialData = {
    name: user.name,
    sobrenome: user.sobrenome,
    email: user.email,
    faixa: user.faixa,
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Editar Usuário
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Altere os dados de {user.name}.
          </Text>
        </View>
        <Card>
          <UserForm
            onSubmit={handleUpdateUser}
            isLoading={isLoading}
            initialData={initialData}
            isEditMode={true}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
