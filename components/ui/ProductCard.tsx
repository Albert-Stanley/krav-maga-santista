import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Product } from '@/types/product';
import { useThemeStore } from '@/store/theme';
import { ShoppingCart } from 'lucide-react-native';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart?: () => void;
  layout?: 'grid' | 'list';
}

export function ProductCard({ product, onPress, onAddToCart, layout = 'grid' }: ProductCardProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const screenWidth = Dimensions.get('window').width;
  const isWeb = screenWidth > 768;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (layout === 'list') {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={`flex-row p-4 rounded-lg mb-3 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}
      >
        <Image
          source={{ uri: product.images[0] }}
          className="w-20 h-20 rounded-lg"
          resizeMode="cover"
        />
        
        <View className="flex-1 ml-4">
          <Text className={`text-base font-semibold mb-1 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`} numberOfLines={2}>
            {product.name}
          </Text>
          
          <Text className={`text-sm mb-2 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`} numberOfLines={2}>
            {product.description}
          </Text>
          
          <View className="flex-row items-center justify-between">
            <Text className={`text-lg font-bold ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}>
              {formatPrice(product.price)}
            </Text>
            
            {!product.inStock && (
              <Text className="text-sm text-red-500 font-medium">
                Fora de estoque
              </Text>
            )}
          </View>
        </View>
        
        {onAddToCart && product.inStock && (
          <TouchableOpacity
            onPress={onAddToCart}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              isDark ? 'bg-primary-600' : 'bg-primary-600'
            }`}
          >
            <ShoppingCart size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }

  // Grid layout
  const cardWidth = isWeb ? (screenWidth - 80) / 3 : (screenWidth - 60) / 2;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-lg mb-4 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}
      style={{ width: cardWidth }}
    >
      <Image
        source={{ uri: product.images[0] }}
        className="w-full h-40 rounded-t-lg"
        resizeMode="cover"
      />
      
      <View className="p-3">
        <Text className={`text-sm font-semibold mb-1 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`} numberOfLines={2}>
          {product.name}
        </Text>
        
        <Text className={`text-xs mb-2 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`} numberOfLines={2}>
          {product.description}
        </Text>
        
        <View className="flex-row items-center justify-between">
          <Text className={`text-base font-bold ${
            isDark ? 'text-primary-400' : 'text-primary-600'
          }`}>
            {formatPrice(product.price)}
          </Text>
          
          {onAddToCart && product.inStock && (
            <TouchableOpacity
              onPress={onAddToCart}
              className={`w-8 h-8 rounded-full items-center justify-center ${
                isDark ? 'bg-primary-600' : 'bg-primary-600'
              }`}
            >
              <ShoppingCart size={16} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        
        {!product.inStock && (
          <Text className="text-xs text-red-500 font-medium mt-1">
            Fora de estoque
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}