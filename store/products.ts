import { create } from 'zustand';
import { Product, ProductFilter, PurchaseIntent } from '@/types/product';
import { mockProducts } from '@/data/mockData';

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  filters: ProductFilter;
  selectedProduct: Product | null;
  purchaseIntents: PurchaseIntent[];
  isLoading: boolean;
}

interface ProductsActions {
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<ProductFilter>) => void;
  clearFilters: () => void;
  setSelectedProduct: (product: Product | null) => void;
  addPurchaseIntent: (intent: Omit<PurchaseIntent, 'id' | 'createdAt' | 'status'>) => void;
  applyFilters: () => void;
}

type ProductsStore = ProductsState & ProductsActions;

export const useProductsStore = create<ProductsStore>((set, get) => ({
  // State
  products: mockProducts,
  filteredProducts: mockProducts,
  searchQuery: '',
  filters: {},
  selectedProduct: null,
  purchaseIntents: [],
  isLoading: false,

  // Actions
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setFilters: (newFilters: Partial<ProductFilter>) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().applyFilters();
  },

  clearFilters: () => {
    set({ filters: {}, searchQuery: '' });
    get().applyFilters();
  },

  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },

  addPurchaseIntent: (intent: Omit<PurchaseIntent, 'id' | 'createdAt' | 'status'>) => {
    const newIntent: PurchaseIntent = {
      ...intent,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    set(state => ({
      purchaseIntents: [...state.purchaseIntents, newIntent]
    }));
  },

  applyFilters: () => {
    const { products, searchQuery, filters } = get();
    
    let filtered = [...products];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.name.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category.slug === filters.category
      );
    }

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter(product => 
        product.type.slug === filters.type
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange!.min && 
        product.price <= filters.priceRange!.max
      );
    }

    // Apply stock filter
    if (filters.inStock !== undefined) {
      filtered = filtered.filter(product => 
        product.inStock === filters.inStock
      );
    }

    set({ filteredProducts: filtered });
  }
}));