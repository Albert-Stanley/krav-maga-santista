export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  type: ProductType;
  inStock: boolean;
  stockQuantity: number;
  images: (string | number)[];
  specifications?: ProductSpecification[];
  sizes?: string[];
  colors?: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductFilter {
  category?: string;
  type?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
}

export interface PurchaseIntent {
  id: string;
  studentId: string;
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
}
