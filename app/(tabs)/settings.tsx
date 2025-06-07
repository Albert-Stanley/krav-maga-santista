import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Sun, Bell, Shield, CircleHelp as HelpCircle, Info, ChevronRight } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useThemeStore } from '@/store/theme';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  action?: 'toggle' | 'navigate';
  value?: boolean;
  onPress?: () => void;
}

export default function Settings() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  const settingsGroups = [
    {
      title: 'Aparência',
      items: [
        {
          id: 'theme',
          title: 'Tema Escuro',
          subtitle: 'Alternar entre tema claro e escuro',
          icon: isDark ? Sun : Moon,
          action: 'toggle' as const,
          value: isDark,
          onPress: toggleTheme,
        },
      ],
    },
    {
      title: 'Notificações',
      items: [
        {
          id: 'notifications',
          title: 'Notificações Push',
          subtitle: 'Receber lembretes de aulas e eventos',
          icon: Bell,
          action: 'toggle' as const,
          value: true,
          onPress: () => console.log('Toggle notifications'),
        },
      ],
    },
    {
      title: 'Conta e Privacidade',
      items: [
        {
          id: 'security',
          title: 'Segurança',
          subtitle: 'Configurações de senha e autenticação',
          icon: Shield,
          action: 'navigate' as const,
          onPress: () => console.log('Navigate to security'),
        },
      ],
    },
    {
      title: 'Suporte',
      items: [
        {
          id: 'help',
          title: 'Central de Ajuda',
          subtitle: 'FAQ e suporte técnico',
          icon: HelpCircle,
          action: 'navigate' as const,
          onPress: () => console.log('Navigate to help'),
        },
        {
          id: 'about',
          title: 'Sobre o App',
          subtitle: 'Versão 1.0.0',
          icon: Info,
          action: 'navigate' as const,
          onPress: () => console.log('Navigate to about'),
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    const IconComponent = item.icon;

    return (
      <TouchableOpacity
        key={item.id}
        onPress={item.onPress}
        className={`flex-row items-center py-4 px-4 rounded-lg ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
        activeOpacity={0.7}
      >
        <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <IconComponent size={20} color={isDark ? '#e5e7eb' : '#374151'} />
        </View>

        <View className="flex-1">
          <Text className={`text-base font-inter-medium ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {item.title}
          </Text>
          {item.subtitle && (
            <Text className={`text-sm font-inter-regular mt-1 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {item.subtitle}
            </Text>
          )}
        </View>

        {item.action === 'toggle' && (
          <View className={`w-12 h-6 rounded-full p-1 ${
            item.value ? 'bg-primary-600' : (isDark ? 'bg-gray-600' : 'bg-gray-300')
          }`}>
            <View className={`w-4 h-4 rounded-full bg-white transition-transform ${
              item.value ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </View>
        )}

        {item.action === 'navigate' && (
          <ChevronRight size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView className="flex-1">
        <View className="px-6 py-8">
          {/* Header */}
          <View className="mb-8">
            <Text className={`text-3xl font-inter-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Configurações
            </Text>
            <Text className={`text-lg font-inter-regular ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Personalize sua experiência no app
            </Text>
          </View>

          {/* Settings Groups */}
          <View className="space-y-6">
            {settingsGroups.map((group, groupIndex) => (
              <View key={groupIndex}>
                <Text className={`text-sm font-inter-semibold mb-3 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                } uppercase tracking-wide`}>
                  {group.title}
                </Text>
                <Card>
                  <View className="space-y-2">
                    {group.items.map((item, itemIndex) => (
                      <View key={item.id}>
                        {renderSettingItem(item)}
                        {itemIndex < group.items.length - 1 && (
                          <View className={`h-px ml-14 ${
                            isDark ? 'bg-gray-700' : 'bg-gray-200'
                          }`} />
                        )}
                      </View>
                    ))}
                  </View>
                </Card>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}