import { Tabs } from 'expo-router';
import { Home, Package, User, Settings, Users } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';
import { currentUser } from '@/data/mockData';

export default function TabLayout() {
  const { theme } = useThemeStore();
  const { user } = useAuthStore();
  const isDark = theme === 'dark';

  const student = user || currentUser;
  const isAdmin =
    student &&
    'rank' in student &&
    typeof student.rank?.level === 'number' &&
    student.rank.level >= 6;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderTopColor: isDark ? '#374151' : '#e5e7eb',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 100,
        },
        tabBarActiveTintColor: '#dc2626',
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color, size }) => (
            <Package size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          href: isAdmin ? '/(tabs)/admin' : null,

          title: 'Admin',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Config',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
      {/* Hide classes tab since we're focusing on the new features */}
      <Tabs.Screen
        name="classes"
        options={{
          href: null, // This hides the tab
        }}
      />
    </Tabs>
  );
}
