import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Calendar, MapPin, UserCheck, CreditCard as Edit3, Save, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { RankBadge } from '@/components/ui/RankBadge';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { currentUser } from '@/data/mockData';

const profileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user, logout } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const screenWidth = Dimensions.get('window').width;
  const isWeb = screenWidth > 768;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use current user from mock data for demo
  const student = user || currentUser;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: student.name,
      email: student.email,
      phone: student.phone || '',
      street: student.address?.street || '',
      number: student.address?.number || '',
      neighborhood: student.address?.neighborhood || '',
      city: student.address?.city || '',
      state: student.address?.state || '',
      zipCode: student.address?.zipCode || '',
      emergencyContactName: student.emergencyContact?.name || '',
      emergencyContactPhone: student.emergencyContact?.phone || '',
      emergencyContactRelationship: student.emergencyContact?.relationship || '',
    }
  });

  const handleLogout = () => {
    Alert.alert(
      'Confirmar Saída',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/login');
          }
        }
      ]
    );
  };

  const handleSave = async (data: ProfileFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    setIsEditing(false);
    setIsLoading(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return text;
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className={`px-6 py-8 ${isWeb ? 'max-w-4xl mx-auto w-full' : ''}`}>
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8">
            <Text className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Perfil
            </Text>
            
            {!isEditing ? (
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                className={`p-2 rounded-lg ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <Edit3 size={20} color={isDark ? '#e5e7eb' : '#374151'} />
              </TouchableOpacity>
            ) : (
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  onPress={handleCancel}
                  className={`p-2 rounded-lg ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <X size={20} color={isDark ? '#e5e7eb' : '#374151'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit(handleSave)}
                  className="p-2 rounded-lg bg-primary-600"
                  disabled={isLoading}
                >
                  <Save size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Profile Header Card */}
          <Card style={{ marginBottom: 24 }}>
            <View className="items-center">
              <View className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <User size={32} color={isDark ? '#e5e7eb' : '#374151'} />
              </View>
              
              <Text className={`text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {student.name}
              </Text>
              
              <View className="flex-row items-center mb-3">
                <RankBadge rank={student.rank} size="md" />
                <Text className={`ml-2 font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {student.rank.name}
                </Text>
              </View>
              
              <Text className={`text-center ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Membro desde {formatDate(student.joinDate)}
              </Text>
            </View>
          </Card>

          {/* Personal Information */}
          <Card style={{ marginBottom: 24 }}>
            <Text className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Informações Pessoais
            </Text>

            <View className="space-y-4">
              {isEditing ? (
                <>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Nome Completo"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.name?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Email"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.email?.message}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Telefone"
                        value={value}
                        onChangeText={(text) => onChange(formatPhone(text))}
                        onBlur={onBlur}
                        error={errors.phone?.message}
                        keyboardType="phone-pad"
                        maxLength={15}
                      />
                    )}
                  />
                </>
              ) : (
                <>
                  <View className="flex-row items-center">
                    <Mail size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                    <View className="ml-3 flex-1">
                      <Text className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Email
                      </Text>
                      <Text className={`text-base font-medium ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {student.email}
                      </Text>
                    </View>
                  </View>

                  {student.phone && (
                    <View className="flex-row items-center">
                      <Phone size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                      <View className="ml-3 flex-1">
                        <Text className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Telefone
                        </Text>
                        <Text className={`text-base font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {student.phone}
                        </Text>
                      </View>
                    </View>
                  )}

                  {student.birthDate && (
                    <View className="flex-row items-center">
                      <Calendar size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                      <View className="ml-3 flex-1">
                        <Text className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Data de Nascimento
                        </Text>
                        <Text className={`text-base font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {formatDate(student.birthDate)}
                        </Text>
                      </View>
                    </View>
                  )}
                </>
              )}
            </View>
          </Card>

          {/* Address Information */}
          {(isEditing || student.address) && (
            <Card style={{ marginBottom: 24 }}>
              <Text className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Endereço
              </Text>

              {isEditing ? (
                <View className="space-y-4">
                  <View className={`${isWeb ? 'flex-row space-x-4' : 'space-y-4'}`}>
                    <View className={isWeb ? 'flex-1' : ''}>
                      <Controller
                        control={control}
                        name="street"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="Rua"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.street?.message}
                          />
                        )}
                      />
                    </View>
                    <View className={isWeb ? 'w-32' : ''}>
                      <Controller
                        control={control}
                        name="number"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="Número"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.number?.message}
                          />
                        )}
                      />
                    </View>
                  </View>

                  <Controller
                    control={control}
                    name="neighborhood"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Bairro"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.neighborhood?.message}
                      />
                    )}
                  />

                  <View className={`${isWeb ? 'flex-row space-x-4' : 'space-y-4'}`}>
                    <View className={isWeb ? 'flex-1' : ''}>
                      <Controller
                        control={control}
                        name="city"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="Cidade"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.city?.message}
                          />
                        )}
                      />
                    </View>
                    <View className={isWeb ? 'w-20' : ''}>
                      <Controller
                        control={control}
                        name="state"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="UF"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.state?.message}
                            maxLength={2}
                          />
                        )}
                      />
                    </View>
                    <View className={isWeb ? 'w-32' : ''}>
                      <Controller
                        control={control}
                        name="zipCode"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="CEP"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.zipCode?.message}
                          />
                        )}
                      />
                    </View>
                  </View>
                </View>
              ) : student.address && (
                <View className="flex-row items-start">
                  <MapPin size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                  <View className="ml-3 flex-1">
                    <Text className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Endereço
                    </Text>
                    <Text className={`text-base font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {student.address.street}, {student.address.number}
                    </Text>
                    <Text className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {student.address.neighborhood}, {student.address.city} - {student.address.state}
                    </Text>
                    <Text className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      CEP: {student.address.zipCode}
                    </Text>
                  </View>
                </View>
              )}
            </Card>
          )}

          {/* Emergency Contact */}
          {(isEditing || student.emergencyContact) && (
            <Card style={{ marginBottom: 24 }}>
              <Text className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Contato de Emergência
              </Text>

              {isEditing ? (
                <View className="space-y-4">
                  <Controller
                    control={control}
                    name="emergencyContactName"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Nome"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.emergencyContactName?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="emergencyContactPhone"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Telefone"
                        value={value}
                        onChangeText={(text) => onChange(formatPhone(text))}
                        onBlur={onBlur}
                        error={errors.emergencyContactPhone?.message}
                        keyboardType="phone-pad"
                        maxLength={15}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="emergencyContactRelationship"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Parentesco"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.emergencyContactRelationship?.message}
                      />
                    )}
                  />
                </View>
              ) : student.emergencyContact && (
                <View className="flex-row items-start">
                  <UserCheck size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                  <View className="ml-3 flex-1">
                    <Text className={`text-base font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {student.emergencyContact.name}
                    </Text>
                    <Text className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {student.emergencyContact.relationship}
                    </Text>
                    <Text className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {student.emergencyContact.phone}
                    </Text>
                  </View>
                </View>
              )}
            </Card>
          )}

          {/* Save Button for Mobile */}
          {isEditing && !isWeb && (
            <View className="mb-6">
              <Button
                title="Salvar Alterações"
                onPress={handleSubmit(handleSave)}
                loading={isLoading}
                disabled={isLoading}
              />
            </View>
          )}

          {/* Logout Button */}
          {!isEditing && (
            <Button
              title="Sair da Conta"
              onPress={handleLogout}
              variant="outline"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}