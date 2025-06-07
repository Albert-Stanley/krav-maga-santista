import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, ShoppingCart, Package, Truck } from 'lucide-react-native';
import { Product } from '@/types/product';
import { useThemeStore } from '@/store/theme';
import { useProductsStore } from '@/store/products';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/Button';

interface ProductDetailModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ visible, product, onClose }: ProductDetailModalProps) {
  const { theme } = useThemeStore();
  const { addPurchaseIntent } = useProductsStore();
  const { user } = useAuthStore();
  const isDark = theme === 'dark';
  const screenWidth = Dimensions.get('window').width;
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handlePurchaseIntent = () => {
    if (!user) return;

    // Validate required selections
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      Alert.alert('Atenção', 'Por favor, selecione um tamanho.');
      return;
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      Alert.alert('Atenção', 'Por favor, selecione uma cor.');
      return;
    }

    addPurchaseIntent({
      studentId: user.id,
      productId: product.id,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined
    });

    Alert.alert(
      'Solicitação Enviada',
      'Sua solicitação de compra foi enviada para análise. Entraremos em contato em breve.',
      [{ text: 'OK', onPress: onClose }]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <View className={`flex-row items-center justify-between p-4 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <Text className={`text-lg font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Detalhes do Produto
          </Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color={isDark ? '#e5e7eb' : '#374151'} />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1">
          {/* Product Images */}
          <View className="h-80">
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={{ width: screenWidth, height: 320 }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>

          <View className="p-6">
            {/* Product Info */}
            <View className="mb-6">
              <Text className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {product.name}
              </Text>
              
              <Text className={`text-3xl font-bold mb-4 ${
                isDark ? 'text-primary-400' : 'text-primary-600'
              }`}>
                {formatPrice(product.price)}
              </Text>
              
              <Text className={`text-base leading-6 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {product.description}
              </Text>
            </View>

            {/* Category and Type */}
            <View className="flex-row mb-6">
              <View className={`flex-1 p-3 rounded-lg mr-2 ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Text className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Categoria
                </Text>
                <Text className={`text-base font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {product.category.name}
                </Text>
              </View>
              
              <View className={`flex-1 p-3 rounded-lg ml-2 ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Text className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Tipo
                </Text>
                <Text className={`text-base font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {product.type.name}
                </Text>
              </View>
            </View>

            {/* Stock Status */}
            <View className={`flex-row items-center p-3 rounded-lg mb-6 ${
              product.inStock 
                ? isDark ? 'bg-green-900/20' : 'bg-green-50'
                : isDark ? 'bg-red-900/20' : 'bg-red-50'
            }`}>
              <Package size={20} color={product.inStock ? '#22c55e' : '#ef4444'} />
              <Text className={`ml-2 font-medium ${
                product.inStock ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.inStock 
                  ? `Em estoque (${product.stockQuantity} unidades)`
                  : 'Fora de estoque'
                }
              </Text>
            </View>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <View className="mb-6">
                <Text className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Tamanho
                </Text>
                <View className="flex-row flex-wrap">
                  {product.sizes.map((size) => (
                    <TouchableOpacity
                      key={size}
                      onPress={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg mr-2 mb-2 border ${
                        selectedSize === size
                          ? 'bg-primary-600 border-primary-600'
                          : isDark
                          ? 'bg-gray-800 border-gray-600'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <Text className={`font-medium ${
                        selectedSize === size
                          ? 'text-white'
                          : isDark
                          ? 'text-gray-200'
                          : 'text-gray-700'
                      }`}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <View className="mb-6">
                <Text className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Cor
                </Text>
                <View className="flex-row flex-wrap">
                  {product.colors.map((color) => (
                    <TouchableOpacity
                      key={color}
                      onPress={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg mr-2 mb-2 border ${
                        selectedColor === color
                          ? 'bg-primary-600 border-primary-600'
                          : isDark
                          ? 'bg-gray-800 border-gray-600'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <Text className={`font-medium ${
                        selectedColor === color
                          ? 'text-white'
                          : isDark
                          ? 'text-gray-200'
                          : 'text-gray-700'
                      }`}>
                        {color}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <View className="mb-6">
                <Text className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Especificações
                </Text>
                <View className={`p-4 rounded-lg ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  {product.specifications.map((spec, index) => (
                    <View key={index} className="flex-row justify-between py-2">
                      <Text className={`font-medium ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {spec.name}:
                      </Text>
                      <Text className={`${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {spec.value}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Purchase Button */}
            {product.inStock && (
              <Button
                title="Solicitar Compra"
                onPress={handlePurchaseIntent}
                style={{ marginBottom: 20 }}
              />
            )}

            {/* Delivery Info */}
            <View className={`flex-row items-center p-3 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <Truck size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
              <Text className={`ml-2 text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Retirada na academia ou entrega mediante consulta
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}