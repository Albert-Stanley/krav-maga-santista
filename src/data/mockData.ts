import { Student, Rank } from '@/types/student';
import { Product, ProductCategory, ProductType } from '@/types/product';
import dayjs from 'dayjs';
import kimono1 from 'assets/images/products/kimono-oficial.png';
import protetor1 from '@assets/images/products/bucal.png';
import protetor2 from '@assets/images/products/bucal2.png';
import protetor3 from '@assets/images/products/bucal3.png';
import camiseta1 from '@assets/images/products/hashguard.png';
import camiseta2 from '@assets/images/products/hashguard2.png';
import manual from '@assets/images/products/manual.png';
import whey from '@assets/images/products/whey.png';
import whey2 from '@assets/images/products/whey2.png';
import bandagem1 from '@assets/images/products/bandagem.png';
import bandagem2 from '@assets/images/products/bandagem2.png';
import bandagem3 from '@assets/images/products/bandagem3.png';
import sacoPancada from '@assets/images/products/sacopancada.png';
import sacoPancada2 from '@assets/images/products/sacopancada2.png';
// Mock Ranks
export const mockRanks: Rank[] = [
  {
    id: '1',
    name: 'Faixa Branca',
    level: 1,
    color: '#ffffff',
    description: 'Iniciante - Fundamentos básicos',
  },
  {
    id: '2',
    name: 'Faixa Amarela',
    level: 2,
    color: '#fbbf24',
    description: 'Básico - Técnicas fundamentais',
  },
  {
    id: '3',
    name: 'Faixa Laranja',
    level: 3,
    color: '#f97316',
    description: 'Intermediário - Combinações básicas',
  },
  {
    id: '4',
    name: 'Faixa Verde',
    level: 4,
    color: '#22c55e',
    description: 'Intermediário - Defesas avançadas',
  },
  {
    id: '5',
    name: 'Faixa Azul',
    level: 5,
    color: '#3b82f6',
    description: 'Avançado - Técnicas complexas',
  },
  {
    id: '6',
    name: 'Faixa Marrom',
    level: 6,
    color: '#a3a3a3',
    description: 'Avançado - Preparação para instrutor',
  },
  {
    id: '7',
    name: 'Faixa Preta',
    level: 7,
    color: '#000000',
    description: 'Instrutor - Domínio completo',
  },
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    birthDate: '1990-05-15',
    rank: mockRanks[3], // Faixa Verde
    joinDate: '2023-01-15',
    isActive: true,
    paymentStatus: {
      status: 'paid',
      lastPaymentDate: dayjs().subtract(10, 'days').format('YYYY-MM-DD'),
      amount: 150,
    },
    nextPaymentDate: dayjs().add(20, 'days').format('YYYY-MM-DD'),
    monthlyFee: 150,
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
    },
    emergencyContact: {
      name: 'Maria Silva',
      relationship: 'Esposa',
      phone: '(11) 88888-8888',
    },
  },
  {
    id: '2',
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(11) 77777-7777',
    birthDate: '1985-08-22',
    rank: mockRanks[4], // Faixa Azul
    joinDate: '2022-06-10',
    isActive: true,
    paymentStatus: {
      status: 'due_soon',
      lastPaymentDate: dayjs().subtract(25, 'days').format('YYYY-MM-DD'),
      amount: 150,
    },
    nextPaymentDate: dayjs().add(5, 'days').format('YYYY-MM-DD'),
    monthlyFee: 150,
  },
  {
    id: '3',
    name: 'Carlos Lima',
    email: 'carlos@email.com',
    phone: '(11) 66666-6666',
    birthDate: '1992-12-03',
    rank: mockRanks[1], // Faixa Amarela
    joinDate: '2023-09-20',
    isActive: true,
    paymentStatus: {
      status: 'overdue',
      lastPaymentDate: dayjs().subtract(40, 'days').format('YYYY-MM-DD'),
      amount: 150,
    },
    nextPaymentDate: dayjs().subtract(10, 'days').format('YYYY-MM-DD'),
    monthlyFee: 150,
  },
  {
    id: '4',
    name: 'Mariana Santos',
    email: 'mariana@email.com',
    phone: '(11) 55555-5555',
    birthDate: '1988-04-18',
    rank: mockRanks[5], // Faixa Marrom
    joinDate: '2021-03-05',
    isActive: true,
    paymentStatus: {
      status: 'paid',
      lastPaymentDate: dayjs().subtract(5, 'days').format('YYYY-MM-DD'),
      amount: 150,
    },
    nextPaymentDate: dayjs().add(25, 'days').format('YYYY-MM-DD'),
    monthlyFee: 150,
  },
];

// Mock Product Categories
export const mockCategories: ProductCategory[] = [
  { id: '1', name: 'Uniformes', slug: 'uniformes' },
  { id: '2', name: 'Equipamentos', slug: 'equipamentos' },
  { id: '3', name: 'Acessórios', slug: 'acessorios' },
  { id: '4', name: 'Livros', slug: 'livros' },
  { id: '5', name: 'Suplementos', slug: 'suplementos' },
];

// Mock Product Types
export const mockTypes: ProductType[] = [
  { id: '1', name: 'Proteção', slug: 'protecao' },
  { id: '2', name: 'Treinamento', slug: 'treinamento' },
  { id: '3', name: 'Vestuário', slug: 'vestuario' },
  { id: '4', name: 'Educativo', slug: 'educativo' },
  { id: '5', name: 'Nutrição', slug: 'nutricao' },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Kimono Krav Maga Oficial',
    description:
      'Kimono oficial da academia, confeccionado em tecido de alta qualidade com bordados exclusivos.',
    price: 89.9,
    category: mockCategories[0], // Uniformes
    type: mockTypes[2], // Vestuário
    images: [kimono1],
    inStock: true,
    stockQuantity: 25,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto'],
    specifications: [
      { name: 'Material', value: '100% Algodão' },
      { name: 'Gramatura', value: '350g/m²' },
      { name: 'Lavagem', value: 'Máquina até 40°C' },
    ],
  },
  {
    id: '2',
    name: 'Luvas de Boxe 12oz',
    description:
      'Luvas profissionais para treinamento de boxe e Krav Maga, com proteção superior.',
    price: 129.9,
    category: mockCategories[1], // Equipamentos
    type: mockTypes[0], // Proteção
    images: [
      'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg',
      'https://images.pexels.com/photos/4761664/pexels-photo-4761664.jpeg',
    ],
    inStock: true,
    stockQuantity: 15,
    colors: ['Vermelho', 'Preto', 'Azul'],
    specifications: [
      { name: 'Peso', value: '12oz' },
      { name: 'Material', value: 'Couro sintético' },
      { name: 'Fechamento', value: 'Velcro' },
    ],
  },
  {
    id: '3',
    name: 'Protetor Bucal',
    description:
      'Protetor bucal moldável para máxima proteção durante os treinos.',
    price: 24.9,
    category: mockCategories[1], // Equipamentos
    type: mockTypes[0], // Proteção
    images: [protetor1, protetor2, protetor3],
    inStock: true,
    stockQuantity: 50,
    colors: ['Transparente', 'Azul', 'Vermelho'],
    specifications: [
      { name: 'Material', value: 'EVA termoplástico' },
      { name: 'Tamanho', value: 'Único moldável' },
    ],
  },
  {
    id: '4',
    name: 'Camiseta Academia',
    description: 'Camiseta oficial da academia em tecido dry-fit para treinos.',
    price: 39.9,
    category: mockCategories[0], // Uniformes
    type: mockTypes[2], // Vestuário
    images: [camiseta1, camiseta2],
    inStock: true,
    stockQuantity: 30,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Cinza', 'Vermelho'],
    specifications: [
      { name: 'Material', value: '100% Poliéster' },
      { name: 'Tecnologia', value: 'Dry-fit' },
    ],
  },
  {
    id: '5',
    name: 'Manual Krav Maga',
    description:
      'Guia completo com técnicas fundamentais e avançadas do Krav Maga.',
    price: 59.9,
    category: mockCategories[3], // Livros
    type: mockTypes[3], // Educativo
    images: [manual],
    inStock: true,
    stockQuantity: 20,
    specifications: [
      { name: 'Páginas', value: '280' },
      { name: 'Idioma', value: 'Português' },
      { name: 'Autor', value: 'Mestre João Silva' },
    ],
  },
  {
    id: '6',
    name: 'Whey Protein 1kg',
    description:
      'Suplemento proteico para auxiliar no desenvolvimento muscular.',
    price: 89.9,
    category: mockCategories[4], // Suplementos
    type: mockTypes[4], // Nutrição
    images: [whey, whey2],
    inStock: false,
    stockQuantity: 0,
    colors: ['Chocolate', 'Baunilha', 'Morango'],
    specifications: [
      { name: 'Peso', value: '1kg' },
      { name: 'Proteína por dose', value: '25g' },
      { name: 'Doses por embalagem', value: '40' },
    ],
  },
  {
    id: '7',
    name: 'Bandagem Elástica',
    description: 'Bandagem para proteção das mãos durante treinos de boxe.',
    price: 19.9,
    category: mockCategories[2], // Acessórios
    type: mockTypes[0], // Proteção
    images: [bandagem1, bandagem2, bandagem3],
    inStock: true,
    stockQuantity: 40,
    colors: ['Preto', 'Vermelho', 'Azul'],
    specifications: [
      { name: 'Comprimento', value: '3 metros' },
      { name: 'Material', value: 'Algodão elástico' },
    ],
  },
  {
    id: '8',
    name: 'Saco de Pancada 1,20m',
    description: 'Saco de pancada profissional para treinamento em casa.',
    price: 299.9,
    category: mockCategories[1], // Equipamentos
    type: mockTypes[1], // Treinamento
    images: [sacoPancada, sacoPancada2],
    inStock: true,
    stockQuantity: 5,
    colors: ['Preto', 'Vermelho'],
    specifications: [
      { name: 'Altura', value: '1,20m' },
      { name: 'Diâmetro', value: '35cm' },
      { name: 'Peso', value: '40kg' },
      { name: 'Material', value: 'Couro sintético' },
    ],
  },
];

// Current user (for demo purposes)
export const currentUser: Student = mockStudents[0];
