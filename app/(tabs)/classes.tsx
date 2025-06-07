import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useThemeStore } from '@/store/theme';

interface Class {
  id: string;
  name: string;
  instructor: string;
  time: string;
  date: string;
  location: string;
  level: string;
}

const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Krav Maga Básico',
    instructor: 'João Silva',
    time: '18:00 - 19:00',
    date: 'Hoje',
    location: 'Academia Principal',
    level: 'Iniciante',
  },
  {
    id: '2',
    name: 'Condicionamento Físico',
    instructor: 'Maria Santos',
    time: '19:00 - 20:00',
    date: 'Hoje',
    location: 'Sala de Musculação',
    level: 'Todos os níveis',
  },
  {
    id: '3',
    name: 'Krav Maga Intermediário',
    instructor: 'Carlos Lima',
    time: '18:00 - 19:30',
    date: 'Amanhã',
    location: 'Academia Principal',
    level: 'Intermediário',
  },
  {
    id: '4',
    name: 'Defesa Pessoal Feminina',
    instructor: 'Ana Costa',
    time: '17:00 - 18:00',
    date: 'Quinta-feira',
    location: 'Sala 2',
    level: 'Todos os níveis',
  },
];

export default function Classes() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'iniciante':
        return 'text-green-600';
      case 'intermediário':
        return 'text-yellow-600';
      case 'avançado':
        return 'text-red-600';
      default:
        return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <ScrollView className="flex-1">
        <View className="px-6 py-8">
          {/* Header */}
          <View className="mb-8">
            <Text
              className={`text-3xl font-inter-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Aulas
            </Text>
            <Text
              className={`text-lg font-inter-regular ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Confira as próximas aulas disponíveis
            </Text>
          </View>

          {/* Classes List */}
          <View className="space-y-4">
            {mockClasses.map((classItem) => (
              <Card key={classItem.id}>
                <View className="space-y-3">
                  <View className="flex-row justify-between items-start">
                    <Text
                      className={`text-lg font-inter-semibold flex-1 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {classItem.name}
                    </Text>
                    <Text
                      className={`text-sm font-inter-medium ${getLevelColor(
                        classItem.level
                      )}`}
                    >
                      {classItem.level}
                    </Text>
                  </View>

                  <Text
                    className={`text-base font-inter-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    Instrutor: {classItem.instructor}
                  </Text>

                  <View className="space-y-2">
                    <View className="flex-row items-center">
                      <Calendar
                        size={16}
                        color={isDark ? '#9ca3af' : '#6b7280'}
                      />
                      <Text
                        className={`ml-2 text-sm font-inter-regular ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {classItem.date}
                      </Text>
                    </View>

                    <View className="flex-row items-center">
                      <Clock size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
                      <Text
                        className={`ml-2 text-sm font-inter-regular ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {classItem.time}
                      </Text>
                    </View>

                    <View className="flex-row items-center">
                      <MapPin
                        size={16}
                        color={isDark ? '#9ca3af' : '#6b7280'}
                      />
                      <Text
                        className={`ml-2 text-sm font-inter-regular ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {classItem.location}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
