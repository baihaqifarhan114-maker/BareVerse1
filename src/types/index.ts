export type Gender = 'male' | 'female' | 'other';
export type DiagnosaScope = 'skin' | 'hair' | 'both';

export type User = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export type OnboardingData = {
  name: string;
  age: number;
  gender: Gender;
  scope: DiagnosaScope;
};

export type DiagnosaType = 'skin' | 'hair';
export type DiagnosaMethod = 'camera' | 'form';

export type DiagnosaResult = {
  type: DiagnosaType;
  classificationKey: string;
  skin_type: string;          // English label, e.g. "Acne-Prone Oily Skin"
  classification: string;     // Indonesian classification, e.g. "Kulit Berminyak dengan Jerawat Aktif"
  explanation: string;
  do: string[];
  dont: string[];
  needed_ingredients: string[];
  method: DiagnosaMethod;
  generatedAt: number;        // Date.now()
};

export type SkinFormAnswers = {
  complaint: 'acne' | 'dry' | 'dull' | 'sensitive' | 'oily' | 'aging' | 'spots';
  type: 'oily' | 'dry' | 'combination' | 'normal';
  acneFrequency: 'sering' | 'kadang' | 'jarang' | 'never';
  extra: 'sensitive' | 'hyperpig' | 'mature' | 'none';
};

export type HairFormAnswers = {
  complaint: 'oily-scalp' | 'dry-ends' | 'dandruff' | 'hair-fall' | 'colored';
  washFrequency: 'daily' | '2-3x' | 'weekly';
  history: 'dye' | 'chemical' | 'none';
};

export type RoutineStep = {
  step: number;
  name: string;
  recommendedIngredients: string[];
  productCategoryFilter: string;
};

export type Routine = {
  morning: RoutineStep[];
  evening: RoutineStep[];
};

export type ProductCategory = 'toner' | 'cleanser' | 'serum' | 'moisturizer' | 'sunscreen' | 'haircare' | 'hair-treatment' | 'skincare';

export type Product = {
  id: string;
  name: string;
  brand: string;
  productType: 'skincare' | 'haircare';
  category: ProductCategory;
  size: string;
  originalPrice: number;
  discountedPrice: number | null;
  discountPercent: number;
  rating: number | null;
  reviewCount: number;
  ingredients: string[];
  primaryIngredients: string[];
  bpomId: string | null;
  claims: string[];
  description: string;
  sourceUrl: string;
  imageUrl: string;
};

export type PriceRange = 'under-50' | '50-150' | 'over-150' | 'all';

export type CartItem = {
  productId: string;
  name: string;
  brand: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
};

export type Address = {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  detail: string;
};

export type ShippingCarrier = 'jnt' | 'jne' | 'sicepat';

export type ShippingOption = {
  carrier: ShippingCarrier;
  name: string;
  estimateDays: string;
  price: number;
};

export type PaymentBank = 'bni' | 'bri';

export type ProductReview = {
  id: string;
  productId: string;
  productName: string;
  authorName: string;
  rating: number;
  text: string;
  createdAt: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  address: Address;
  shipping: ShippingOption;
  payment: { bank: PaymentBank; virtualAccountNumber: string };
  subtotal: number;
  shippingCost: number;
  total: number;
  createdAt: number;
};
