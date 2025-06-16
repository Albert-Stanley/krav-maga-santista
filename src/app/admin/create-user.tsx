// src/app/admin/create-user.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { UserForm, UserFormData } from '@/components/forms/UserForm';
import { useUsersStore } from '@/store/students'; // Usando a store de CRUD

export default function CreateUserScreen() {
  const { createUser } = useUsersStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateUser = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      // O payload esperado pelo backend é diferente do formulário (PascalCase)
      const payload = {
        Nome: data.name,
        Sobrenome: data.sobrenome,
        Email: data.email,
        Password: data.password,
        Faixa: data.faixa,
      };

      await createUser(payload as any); // Usamos 'any' pela diferença de tipagem, mas é seguro aqui
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      router.back(); // Volta para a lista de administração
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Adicionar Novo Usuário
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Preencha os dados abaixo.
          </Text>
        </View>
        <Card>
          <UserForm onSubmit={handleCreateUser} isLoading={isLoading} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
