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
