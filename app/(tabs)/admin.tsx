import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Search, Filter } from 'lucide-react-native';
import { SearchInput } from '@/components/ui/SearchInput';
import { Card } from '@/components/ui/Card';
import { RankBadge } from '@/components/ui/RankBadge';
import { PaymentStatusBadge } from '@/components/ui/PaymentStatusBadge';
import { useThemeStore } from '@/store/theme';
import { useStudentsStore } from '@/store/students';

export default function Admin() {
  const { theme } = useThemeStore();
  const {
    filteredStudents,
    searchQuery,
    setSearchQuery
  } = useStudentsStore();
  
  const isDark = theme === 'dark';
  const screenWidth = Dimensions.get('window').width;
  const isWeb = screenWidth > 768;

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getActiveStudentsCount = () => {
    return filteredStudents.filter(student => student.isActive).length;
  };

  const getPaymentStatusCounts = () => {
    const counts = {
      paid: 0,
      due_soon: 0,
      overdue: 0
    };

    filteredStudents.forEach(student => {
      counts[student.paymentStatus.status]++;
    });

    return counts;
  };

  const paymentCounts = getPaymentStatusCounts();

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <View className={`flex-1 ${isWeb ? 'max-w-6xl mx-auto w-full' : ''}`}>
        {/* Header */}
        <View className="px-6 py-4">
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 bg-primary-600 rounded-full items-center justify-center mr-3">
              <Users size={20} color="#fff" />
            </View>
            <View>
              <Text className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Administração
              </Text>
              <Text className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Gestão de alunos e academia
              </Text>
            </View>
          </View>

          {/* Stats Cards */}
          <View className={`${
            isWeb 
              ? 'grid grid-cols-4 gap-4 mb-6' 
              : 'flex-row flex-wrap justify-between mb-6'
          }`}>
            <View className={isWeb ? '' : 'w-[48%] mb-4'}>
              <Card>
                <Text className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {getActiveStudentsCount()}
                </Text>
                <Text className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Alunos Ativos
                </Text>
              </Card>
            </View>

            <View className={isWeb ? '' : 'w-[48%] mb-4'}>
              <Card>
                <Text className="text-2xl font-bold text-green-600">
                  {paymentCounts.paid}
                </Text>
                <Text className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Pagamentos em Dia
                </Text>
              </Card>
            </View>

            <View className={isWeb ? '' : 'w-[48%] mb-4'}>
              <Card>
                <Text className="text-2xl font-bold text-yellow-600">
                  {paymentCounts.due_soon}
                </Text>
                <Text className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Vencimento Próximo
                </Text>
              </Card>
            </View>

            <View className={isWeb ? '' : 'w-[48%] mb-4'}>
              <Card>
                <Text className="text-2xl font-bold text-red-600">
                  {paymentCounts.overdue}
                </Text>
                <Text className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Em Atraso
                </Text>
              </Card>
            </View>
          </View>

          {/* Search */}
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={handleClearSearch}
            placeholder="Buscar alunos..."
          />
        </View>

        {/* Students List */}
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <View className="py-4">
            <Text className={`text-sm mb-4 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {filteredStudents.length} aluno(s) encontrado(s)
            </Text>

            {isWeb ? (
              // Web Table Layout
              <Card>
                <View className={`border-b pb-3 mb-3 ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <View className="flex-row">
                    <Text className={`flex-1 font-semibold ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Nome
                    </Text>
                    <Text className={`w-32 font-semibold ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Graduação
                    </Text>
                    <Text className={`w-40 font-semibold ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Status Pagamento
                    </Text>
                    <Text className={`w-32 font-semibold ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Próximo Venc.
                    </Text>
                  </View>
                </View>

                {filteredStudents.map((student, index) => (
                  <View 
                    key={student.id}
                    className={`flex-row items-center py-3 ${
                      index < filteredStudents.length - 1 
                        ? `border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}` 
                        : ''
                    }`}
                  >
                    <View className="flex-1">
                      <Text className={`font-medium ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {student.name}
                      </Text>
                      <Text className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {student.email}
                      </Text>
                    </View>

                    <View className="w-32">
                      <RankBadge rank={student.rank} size="sm" showLevel />
                    </View>

                    <View className="w-40">
                      <PaymentStatusBadge paymentStatus={student.paymentStatus} size="sm" />
                    </View>

                    <View className="w-32">
                      <Text className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {formatDate(student.nextPaymentDate)}
                      </Text>
                    </View>
                  </View>
                ))}
              </Card>
            ) : (
              // Mobile Card Layout
              <View>
                {filteredStudents.map((student) => (
                  <Card key={student.id} style={{ marginBottom: 16 }}>
                    <View className="space-y-3">
                      <View className="flex-row justify-between items-start">
                        <View className="flex-1">
                          <Text className={`text-lg font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {student.name}
                          </Text>
                          <Text className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {student.email}
                          </Text>
                        </View>
                        <RankBadge rank={student.rank} size="sm" />
                      </View>

                      <View className="flex-row justify-between items-center">
                        <PaymentStatusBadge paymentStatus={student.paymentStatus} size="sm" />
                        <Text className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Próx. venc: {formatDate(student.nextPaymentDate)}
                        </Text>
                      </View>
                    </View>
                  </Card>
                ))}
              </View>
            )}

            {filteredStudents.length === 0 && (
              <View className="items-center py-12">
                <Text className={`text-lg font-medium mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Nenhum aluno encontrado
                </Text>
                <Text className={`text-center ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Tente ajustar o termo de busca
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}