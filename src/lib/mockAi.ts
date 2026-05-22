import type {
  DiagnosaResult,
  SkinFormAnswers,
  HairFormAnswers,
  OnboardingData,
  DiagnosaType,
  Routine,
} from '@/types';
import { SKIN_CLASSIFICATIONS, HAIR_CLASSIFICATIONS } from './diagnosaClassifications';

function classifySkin(a: SkinFormAnswers): string {
  if (a.complaint === 'acne' && (a.acneFrequency === 'sering' || a.acneFrequency === 'kadang') && a.type === 'oily') return 'acne-oily';
  if (a.complaint === 'acne' && a.acneFrequency === 'jarang' && a.extra === 'hyperpig') return 'hyperpigmented';
  if (a.complaint === 'spots' || a.extra === 'hyperpig') return 'hyperpigmented';
  if (a.complaint === 'aging' || a.extra === 'mature') return 'dry-mature';
  if (a.complaint === 'dry' && a.type === 'dry') return 'dry-mature';
  if (a.complaint === 'sensitive' && a.extra === 'sensitive') return 'sensitive-reactive';
  if (a.complaint === 'sensitive' && a.type === 'dry') return 'dehydrated-sensitive';
  if (a.complaint === 'oily' && a.acneFrequency === 'jarang') return 'oily-congested';
  if (a.complaint === 'oily' && a.type === 'oily') return 'oily-congested';
  if (a.complaint === 'dull' && a.type === 'combination') return 'combination-dull';
  if (a.complaint === 'dull') return 'combination-dull';
  if (a.complaint === 'acne') return 'acne-oily';
  return 'normal-healthy';
}

function classifyHair(a: HairFormAnswers): string {
  if (a.complaint === 'colored' || a.history === 'dye') return 'color-treated';
  if (a.complaint === 'dandruff') return 'dandruff';
  if (a.complaint === 'hair-fall') return 'hair-fall';
  if (a.complaint === 'dry-ends' && a.history === 'chemical') return 'dry-damaged';
  if (a.complaint === 'dry-ends') return 'dry-damaged';
  if (a.complaint === 'oily-scalp') return 'oily-scalp';
  return 'normal-hair';
}

function buildResult(type: DiagnosaType, key: string, method: 'camera' | 'form'): DiagnosaResult {
  const template = type === 'skin' ? SKIN_CLASSIFICATIONS[key] : HAIR_CLASSIFICATIONS[key];
  if (!template) throw new Error(`Unknown classification key: ${key}`);
  return {
    ...template,
    type,
    method,
    generatedAt: Date.now(),
  };
}

export function runFormSkinDiagnosa(answers: SkinFormAnswers): DiagnosaResult {
  return buildResult('skin', classifySkin(answers), 'form');
}

export function runFormHairDiagnosa(answers: HairFormAnswers): DiagnosaResult {
  return buildResult('hair', classifyHair(answers), 'form');
}

type WeightedKey = { key: string; weight: number };

function pickWeighted(items: WeightedKey[]): string {
  const total = items.reduce((s, it) => s + it.weight, 0);
  let r = Math.random() * total;
  for (const it of items) {
    r -= it.weight;
    if (r <= 0) return it.key;
  }
  return items[items.length - 1].key;
}

export function runCameraDiagnosa(onboarding: OnboardingData, type: DiagnosaType): DiagnosaResult {
  let weights: WeightedKey[];
  if (type === 'skin') {
    if (onboarding.age <= 25) {
      weights = [
        { key: 'acne-oily', weight: 50 },
        { key: 'oily-congested', weight: 20 },
        { key: 'hyperpigmented', weight: 15 },
        { key: 'normal-healthy', weight: 15 },
      ];
    } else if (onboarding.age <= 35) {
      weights = [
        { key: 'combination-dull', weight: 30 },
        { key: 'hyperpigmented', weight: 25 },
        { key: 'dehydrated-sensitive', weight: 25 },
        { key: 'normal-healthy', weight: 20 },
      ];
    } else {
      weights = [
        { key: 'dry-mature', weight: 50 },
        { key: 'hyperpigmented', weight: 25 },
        { key: 'combination-dull', weight: 25 },
      ];
    }
  } else {
    weights = [
      { key: 'oily-scalp', weight: 35 },
      { key: 'dry-damaged', weight: 25 },
      { key: 'hair-fall', weight: 20 },
      { key: 'dandruff', weight: 10 },
      { key: 'normal-hair', weight: 10 },
    ];
  }
  return buildResult(type, pickWeighted(weights), 'camera');
}

const SKIN_ROUTINE_TEMPLATE: { morning: Array<{ name: string; cat: string }>; evening: Array<{ name: string; cat: string }> } = {
  morning: [
    { name: 'Gentle Cleanser', cat: 'cleanser' },
    { name: 'Hydrating Toner', cat: 'toner' },
    { name: 'Treatment Serum', cat: 'serum' },
    { name: 'Lightweight Moisturizer', cat: 'moisturizer' },
    { name: 'Sunscreen SPF 30+', cat: 'sunscreen' },
  ],
  evening: [
    { name: 'Oil Cleanser / Micellar', cat: 'cleanser' },
    { name: 'Gentle Cleanser (double cleanse)', cat: 'cleanser' },
    { name: 'Treatment Serum', cat: 'serum' },
    { name: 'Nourishing Moisturizer', cat: 'moisturizer' },
  ],
};

const HAIR_ROUTINE_TEMPLATE: { morning: Array<{ name: string; cat: string }>; evening: Array<{ name: string; cat: string }> } = {
  morning: [
    { name: 'Leave-in Conditioner', cat: 'haircare' },
    { name: 'Hair Serum', cat: 'haircare' },
  ],
  evening: [
    { name: 'Shampoo', cat: 'haircare' },
    { name: 'Conditioner', cat: 'haircare' },
    { name: 'Weekly Hair Mask', cat: 'hair-treatment' },
  ],
};

export function generateRoutine(result: DiagnosaResult): Routine {
  const template = result.type === 'skin' ? SKIN_ROUTINE_TEMPLATE : HAIR_ROUTINE_TEMPLATE;
  const ings = result.needed_ingredients;
  return {
    morning: template.morning.map((s, i) => ({
      step: i + 1,
      name: s.name,
      recommendedIngredients: ings.slice(0, 3),
      productCategoryFilter: s.cat,
    })),
    evening: template.evening.map((s, i) => ({
      step: i + 1,
      name: s.name,
      recommendedIngredients: ings.slice(0, 3),
      productCategoryFilter: s.cat,
    })),
  };
}
