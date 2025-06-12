import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Calendar,
  CreditCard,
  Trophy,
  Users,
  Clock,
} from 'lucide-react-native';
import dayjs from 'dayjs';
import { Card } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { RankBadge } from '@/components/ui/RankBadge';
import { PaymentStatusBadge } from '@/components/ui/PaymentStatusBadge';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { currentUser } from '@/data/mockData';
const logo = require('@assets/images/logo_app.png');

export default function Home() {
  const { user, isLoading } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const screenWidth = Dimensions.get('window').width;
  const isWeb = screenWidth > 768;

  // Use current user from mock data for demo
  const student = user || currentUser;

  // verificação para evitar crash se 'student' for nulo
  if (isLoading || !student) {
    return (
      <SafeAreaView
        edges={['top', 'left', 'right']}
        className={`flex-1 items-center justify-center ${
          isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />
      </SafeAreaView>
    );
  }

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD/MM/YYYY');
  };

  const getDaysUntilPayment = () => {
    const today = dayjs();
    const paymentDate = dayjs(student.nextPaymentDate);
    return paymentDate.diff(today, 'day');
  };

  const stats = [
    {
      icon: Trophy,
      label: 'Sua Graduação',
      value: student.rank.name,
      color: '#f59e0b',
    },
    {
      icon: Calendar,
      label: 'Membro desde',
      value: formatDate(student.joinDate),
      color: '#3b82f6',
    },
    {
      icon: Users,
      label: 'Alunos ativos',
      value: '127',
      color: '#22c55e',
    },
    {
      icon: Clock,
      label: 'Próxima aula',
      value: 'Hoje 18:00',
      color: '#ef4444',
    },
  ];

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View
          className={`px-6 py-8 ${isWeb ? 'max-w-4xl mx-auto w-full' : ''}`}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center flex-1">
              {/*  Logo da aplicação  */}

              <View className="w-12 h-12 rounded-full items-center justify-center mr-4">
                <Image
                  source={logo}
                  className="w-12 h-12 rounded-full"
                  resizeMode="contain"
                />
              </View>

              <View className="flex-1">
                <Text
                  className={`text-xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Academia Krav Maga
                </Text>
                <Text
                  className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Bem-vindo, {student.name}!
                </Text>
              </View>
            </View>
            <ThemeToggle />
          </View>

          {/* Current Rank Card */}
          <Card style={{ marginBottom: 24 }}>
            <View className="items-center">
              <Text
                className={`text-lg font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Sua Graduação Atual
              </Text>

              <RankBadge rank={student.rank} size="lg" />

              <Text
                className={`text-2xl font-bold mt-3 mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {student.rank.name}
              </Text>

              <Text
                className={`text-center ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {student.rank.description}
              </Text>
            </View>
          </Card>

          {/* Payment Status Card */}
          <Card style={{ marginBottom: 24 }}>
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Status de Pagamento
              </Text>
              <PaymentStatusBadge paymentStatus={student.paymentStatus} />
            </View>

            <View className="space-y-3">
              <View className="flex-row items-center">
                <CreditCard size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                <View className="ml-3 flex-1">
                  <Text
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Mensalidade
                  </Text>
                  <Text
                    className={`text-base font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(student.monthlyFee)}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <Calendar size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                <View className="ml-3 flex-1">
                  <Text
                    className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Próximo vencimento
                  </Text>
                  <Text
                    className={`text-base font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {formatDate(student.nextPaymentDate)}
                  </Text>
                  <Text
                    className={`text-sm ${
                      getDaysUntilPayment() < 0
                        ? 'text-red-500'
                        : getDaysUntilPayment() <= 7
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}
                  >
                    {getDaysUntilPayment() < 0
                      ? `${Math.abs(getDaysUntilPayment())} dias em atraso`
                      : getDaysUntilPayment() === 0
                      ? 'Vence hoje'
                      : `${getDaysUntilPayment()} dias restantes`}
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          {/* Stats Grid */}
          <View className="mb-6">
            <Text
              className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Visão Geral
            </Text>

            <View
              className={`${
                isWeb
                  ? 'grid grid-cols-2 gap-4'
                  : 'flex-row flex-wrap justify-between'
              }`}
            >
              {stats.map((stat, index) => (
                <View key={index} className={`${isWeb ? '' : 'w-[48%] mb-4'}`}>
                  <Card>
                    <View className="flex-row items-center">
                      <View
                        className="w-12 h-12 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <stat.icon size={20} color={stat.color} />
                      </View>
                      <View className="flex-1">
                        <Text
                          className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {stat.label}
                        </Text>
                        <Text
                          className={`text-base font-bold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                          numberOfLines={1}
                        >
                          {stat.value}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </View>
              ))}
            </View>
          </View>

          {/* Next Class Card */}
          <Card>
            <Text
              className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Próxima Aula
            </Text>
            <View className="space-y-2">
              <Text
                className={`text-base font-medium ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                Krav Maga Intermediário
              </Text>
              <Text
                className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Hoje às 18:00 - Instrutor: João Silva
              </Text>
              <Text
                className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Sala: Academia Principal
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
