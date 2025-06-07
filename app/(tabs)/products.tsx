import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Grid2x2 as Grid, List, X } from 'lucide-react-native';
import { SearchInput } from '@/components/ui/SearchInput';
import { FilterChip } from '@/components/ui/FilterChip';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductDetailModal } from '@/components/modals/ProductDetailModal';
import { useThemeStore } from '@/store/theme';
import { useProductsStore } from '@/store/products';
import { mockCategories, mockTypes } from '@/data/mockData';

export default function Products() {
  const { theme } = useThemeStore();
  const {
    filteredProducts,
    searchQuery,
    filters,
    selectedProduct,
    setSearchQuery,
    setFilters,
    clearFilters,
    setSelectedProduct
  } = useProductsStore();
  
  const isDark = theme === 'dark';
  const screenWidth = Dimensions.get('window').width;
  const isWeb = screenWidth > 768;
  
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges = [
    { label: 'Até R$ 50', min: 0, max: 50 },
    { label: 'R$ 50 - R$ 100', min: 50, max: 100 },
    { label: 'R$ 100 - R$ 200', min: 100, max: 200 },
    { label: 'Acima de R$ 200', min: 200, max: 999999 }
  ];

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCategoryFilter = (categorySlug: string) => {
    const isSelected = filters.category === categorySlug;
    setFilters({ 
      category: isSelected ? undefined : categorySlug 
    });
  };

  const handleTypeFilter = (typeSlug: string) => {
    const isSelected = filters.type === typeSlug;
    setFilters({ 
      type: isSelected ? undefined : typeSlug 
    });
  };

  const handlePriceFilter = (range: { min: number; max: number }) => {
    const isSelected = filters.priceRange?.min === range.min && filters.priceRange?.max === range.max;
    setFilters({ 
      priceRange: isSelected ? undefined : range 
    });
  };

  const handleStockFilter = () => {
    setFilters({ 
      inStock: filters.inStock === true ? undefined : true 
    });
  };

  const hasActiveFilters = () => {
    return filters.category || filters.type || filters.priceRange || filters.inStock !== undefined;
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <View className={`flex-1 ${isWeb ? 'max-w-6xl mx-auto w-full' : ''}`}>
        {/* Header */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Produtos
            </Text>
            
            <View className="flex-row items-center space-x-2">
              <TouchableOpacity
                onPress={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg ${
                  showFilters || hasActiveFilters()
                    ? 'bg-primary-600'
                    : isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <Filter 
                  size={20} 
                  color={showFilters || hasActiveFilters() ? '#fff' : isDark ? '#e5e7eb' : '#374151'} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setLayout(layout === 'grid' ? 'list' : 'grid')}
                className={`p-2 rounded-lg ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                {layout === 'grid' ? (
                  <List size={20} color={isDark ? '#e5e7eb' : '#374151'} />
                ) : (
                  <Grid size={20} color={isDark ? '#e5e7eb' : '#374151'} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Search */}
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={handleClearSearch}
            placeholder="Buscar produtos..."
          />

          {/* Active Filters Summary */}
          {hasActiveFilters() && (
            <View className="flex-row items-center mt-3">
              <Text className={`text-sm mr-2 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Filtros ativos:
              </Text>
              <TouchableOpacity
                onPress={clearFilters}
                className="flex-row items-center px-2 py-1 rounded-full bg-red-100"
              >
                <Text className="text-red-800 text-xs font-medium mr-1">
                  Limpar todos
                </Text>
                <X size={12} color="#dc2626" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Filters */}
        {showFilters && (
          <View className={`px-6 py-4 border-t ${
            isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Categories */}
              <View className="mb-4">
                <Text className={`text-sm font-semibold mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Categorias
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row space-x-2">
                    {mockCategories.map((category) => (
                      <FilterChip
                        key={category.id}
                        label={category.name}
                        isSelected={filters.category === category.slug}
                        onPress={() => handleCategoryFilter(category.slug)}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Types */}
              <View className="mb-4">
                <Text className={`text-sm font-semibold mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Tipos
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row space-x-2">
                    {mockTypes.map((type) => (
                      <FilterChip
                        key={type.id}
                        label={type.name}
                        isSelected={filters.type === type.slug}
                        onPress={() => handleTypeFilter(type.slug)}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Price Ranges */}
              <View className="mb-4">
                <Text className={`text-sm font-semibold mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Faixa de Preço
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row space-x-2">
                    {priceRanges.map((range, index) => (
                      <FilterChip
                        key={index}
                        label={range.label}
                        isSelected={
                          filters.priceRange?.min === range.min && 
                          filters.priceRange?.max === range.max
                        }
                        onPress={() => handlePriceFilter(range)}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Stock Filter */}
              <View>
                <Text className={`text-sm font-semibold mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Disponibilidade
                </Text>
                <FilterChip
                  label="Apenas em estoque"
                  isSelected={filters.inStock === true}
                  onPress={handleStockFilter}
                />
              </View>
            </ScrollView>
          </View>
        )}

        {/* Products List */}
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <View className="py-4">
            <Text className={`text-sm mb-4 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {filteredProducts.length} produto(s) encontrado(s)
            </Text>

            {layout === 'grid' ? (
              <View className={`${
                isWeb 
                  ? 'grid grid-cols-3 gap-4' 
                  : 'flex-row flex-wrap justify-between'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    layout="grid"
                    onPress={() => setSelectedProduct(product)}
                  />
                ))}
              </View>
            ) : (
              <View>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    layout="list"
                    onPress={() => setSelectedProduct(product)}
                  />
                ))}
              </View>
            )}

            {filteredProducts.length === 0 && (
              <View className="items-center py-12">
                <Text className={`text-lg font-medium mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Nenhum produto encontrado
                </Text>
                <Text className={`text-center ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Tente ajustar os filtros ou termo de busca
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Product Detail Modal */}
      <ProductDetailModal
        visible={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </SafeAreaView>
  );
}