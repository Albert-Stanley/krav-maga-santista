// src/app/(tabs)/admin.tsx

import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, PlusCircle, Pencil, Trash2 } from 'lucide-react-native';
import { router, useFocusEffect } from 'expo-router';
import { SearchInput } from '@/components/ui/SearchInput';
import { Card } from '@/components/ui/Card';
import { useThemeStore } from '@/store/theme';
import { useUsersStore } from '@/store/students'; // Store de CRUD de usuários
import { User } from '@/types/auth';

export default function Admin() {
  const { theme } = useThemeStore();
  const {
    users, // Usaremos `users` para o total e `filteredUsers` para a lista
    filteredUsers,
    isLoading,
    fetchUsers,
    deleteUser,
    searchQuery,
    setSearchQuery,
  } = useUsersStore();

  const isDark = theme === 'dark';
  const screenWidth = Dimensions.get('window').width;
  const isWeb = screenWidth > 768;

  // useFocusEffect garante que os dados sejam recarregados sempre que a tela entrar em foco.
  // Isso é útil para ver as atualizações após criar ou editar um usuário.
  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const handleClearSearch = () => setSearchQuery('');

  const handleDelete = (userId: string, userName: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Você tem certeza que deseja excluir o usuário "${userName}"? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(userId);
              Alert.alert('Sucesso', 'Usuário excluído com sucesso.');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o usuário.');
            }
          },
        },
      ]
    );
  };

  const handleNavigateToCreate = () => {
    router.push('/admin/create-user');
  };

  const handleNavigateToEdit = (userId: string) => {
    router.push(`/admin/edit-user?id=${userId}`);
  };

  const getActiveUsersCount = () => {
    return users.filter((user) => user.isActive).length;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    // Adiciona timeZone para evitar problemas de data off-by-one
    return new Date(dateString).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    });
  };

  // Exibe o loading inicial
  if (isLoading && users.length === 0) {
    return (
      <SafeAreaView
        className={`flex-1 justify-center items-center ${
          isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <ActivityIndicator size="large" color={isDark ? '#fff' : '#1f2937'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <View className={`flex-1 ${isWeb ? 'max-w-6xl mx-auto w-full' : ''}`}>
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-primary-600 rounded-full items-center justify-center mr-3">
                <Users size={20} color="#fff" />
              </View>
              <View>
                <Text
                  className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Administração
                </Text>
                <Text
                  className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Gestão de usuários
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleNavigateToCreate}
              className="flex-row items-center bg-primary-600 py-2 px-3 rounded-lg"
            >
              <PlusCircle size={20} color="#fff" />
              {isWeb && (
                <Text className="text-white font-semibold ml-2">Adicionar</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Stats Cards Adaptados */}
          <View className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <Text
                className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {users.length}
              </Text>
              <Text
                className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Total de Usuários
              </Text>
            </Card>
            <Card>
              <Text className="text-2xl font-bold text-green-600">
                {getActiveUsersCount()}
              </Text>
              <Text
                className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Usuários Ativos
              </Text>
            </Card>
          </View>

          {/* Search */}
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={handleClearSearch}
            placeholder="Buscar por nome ou email..."
          />
        </View>

        {/* Lista de Usuários */}
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          <View className="py-4">
            <Text
              className={`text-sm mb-4 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {filteredUsers.length} usuário(s) encontrado(s)
            </Text>

            {/* Mobile Card Layout */}
            {!isWeb && (
              <View>
                {filteredUsers.map((user) => (
                  <Card key={user.id} style={{ marginBottom: 16 }}>
                    <View className="space-y-3">
                      <View>
                        <Text
                          className={`text-lg font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {user.name}
                        </Text>
                        <Text
                          className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {user.email}
                        </Text>
                      </View>
                      <View
                        className={`border-t ${
                          isDark ? 'border-gray-700' : 'border-gray-200'
                        }`}
                      />
                      <View className="flex-row justify-between items-center">
                        <View>
                          <Text
                            className={`text-xs font-bold uppercase ${
                              isDark ? 'text-gray-500' : 'text-gray-500'
                            }`}
                          >
                            Faixa
                          </Text>
                          <Text
                            className={`text-sm ${
                              isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {user.faixa || user.membershipLevel}
                          </Text>
                        </View>
                        <View>
                          <Text
                            className={`text-xs font-bold uppercase ${
                              isDark ? 'text-gray-500' : 'text-gray-500'
                            }`}
                          >
                            Desde
                          </Text>
                          <Text
                            className={`text-sm ${
                              isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {formatDate(user.joinDate)}
                          </Text>
                        </View>
                      </View>
                      {/* CRUD Actions */}
                      <View className="flex-row justify-end space-x-4 pt-2">
                        <TouchableOpacity
                          onPress={() => handleNavigateToEdit(user.id)}
                          className="p-2"
                        >
                          <Pencil
                            size={20}
                            color={isDark ? '#3b82f6' : '#2563eb'}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDelete(user.id, user.name)}
                          className="p-2"
                        >
                          <Trash2
                            size={20}
                            color={isDark ? '#ef4444' : '#dc2626'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>
                ))}
              </View>
            )}

            {/* Mensagem de nenhum resultado */}
            {filteredUsers.length === 0 && (
              <View className="items-center py-12">
                <Text
                  className={`text-lg font-medium mb-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Nenhum usuário encontrado
                </Text>
                <Text
                  className={`text-center ${
                    isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}
                >
                  Tente ajustar o termo de busca ou adicione um novo usuário.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Pequenos estilos para os botões de ação se necessário
const styles = StyleSheet.create({
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3b82f6', // blue-500
  },
  deleteButton: {
    backgroundColor: '#ef4444', // red-500
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
  },
});
