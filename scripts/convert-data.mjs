import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARCHIVE = 'C:/Users/baiha/Downloads/archive';
const HAIRCARE_CSV = 'C:/Users/baiha/Downloads/haircare_hairtreatment.csv';
const OUT = path.resolve(__dirname, '../src/data');

fs.mkdirSync(OUT, { recursive: true });

function readSheet(file) {
  const wb = xlsx.readFile(file);
  return xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: null });
}

const clean = (s) => (s == null ? '' : String(s).trim());
const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);

// ----- ingredients -----
const ingRows = readSheet(`${ARCHIVE}/ingredients_category.xlsx`);
const ingredients = ingRows
  .map((r) => ({
    name: clean(r.ingredient_name),
    functions: [clean(r.function1), clean(r.function2)].filter(Boolean),
    warnings: [clean(r.warning1), clean(r.warning2)].filter(Boolean),
    origin: clean(r.ingredient_origin),
    charge: clean(r.ingredient_charge),
  }))
  .filter((i) => i.name);

fs.writeFileSync(`${OUT}/ingredients.json`, JSON.stringify(ingredients, null, 2));
console.log(`✓ ingredients.json — ${ingredients.length} rows`);

const ingredientNameSet = new Set(ingredients.map((i) => i.name.toLowerCase()));

// ----- claims -----
const claimRows = readSheet(`${ARCHIVE}/product_claim_category.xlsx`);
const descToClaim = new Map();
for (const r of claimRows) {
  const d = clean(r.description_product);
  const c = clean(r.claim_category);
  if (d && c) descToClaim.set(d.toLowerCase(), c);
}
const uniqueClaims = [...new Set(claimRows.map((r) => clean(r.claim_category)).filter(Boolean))];
fs.writeFileSync(`${OUT}/claims.json`, JSON.stringify(uniqueClaims, null, 2));
console.log(`✓ claims.json — ${uniqueClaims.length} unique claims`);

// ----- skincare products -----
const prodRows = readSheet(`${ARCHIVE}/product.xlsx`);

const categoryMap = {
  toner: 'toner',
  'facial wash': 'cleanser',
  cleanser: 'cleanser',
  serum: 'serum',
  moisturizer: 'moisturizer',
  sunscreen: 'sunscreen',
  essence: 'serum',
};

function inferCategory(productType) {
  const t = clean(productType).toLowerCase();
  for (const [k, v] of Object.entries(categoryMap)) {
    if (t.includes(k)) return v;
  }
  return 'skincare';
}

function parseIngredients(raw) {
  if (!raw) return [];
  return String(raw)
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length < 80)
    .map((s) => s.replace(/\s+/g, ' '));
}

function extractClaims(description) {
  if (!description) return [];
  const tags = new Set();
  const parts = String(description).split(/[,\r\n]/).map((p) => p.trim().toLowerCase());
  for (const p of parts) {
    const tag = descToClaim.get(p);
    if (tag) tags.add(tag);
  }
  return [...tags];
}

const skincareProducts = prodRows.map((r, idx) => {
  const ings = parseIngredients(r.ingredients_list);
  return {
    id: `sk-${slug(r.product_name) || idx}-${idx}`,
    name: clean(r.product_name),
    brand: clean(r.brand),
    productType: 'skincare',
    category: inferCategory(r.product_type),
    size: clean(r.size),
    originalPrice: Number(r.normal_price) || 0,
    discountedPrice: r.discount_price && r.discount_price !== r.normal_price ? Number(r.discount_price) : null,
    discountPercent: r.discount ? Math.round(Number(r.discount) * 100) : 0,
    rating: r.rating ? Number(r.rating) : null,
    reviewCount: r.review_count ? Number(r.review_count) : 0,
    ingredients: ings,
    primaryIngredients: ings.slice(0, 5),
    bpomId: clean(r.bpom_id) || null,
    claims: extractClaims(r.description_product),
    description: clean(r.description_product),
    sourceUrl: clean(r.product_url),
    imageUrl: `https://picsum.photos/seed/${slug(r.brand)}-${idx}/600/600`,
  };
});

// ----- haircare products -----
function parseHaircarePrice(raw) {
  if (!raw || raw === 'null') return { normal: 0, discount: null };
  // Patterns: "Rp 95.000", "Rp 95.000Rp 76.000", "Rp95.000"
  const matches = String(raw).match(/Rp\s*[\d.,]+/g);
  if (!matches || matches.length === 0) return { normal: 0, discount: null };
  const toNum = (s) => Number(s.replace(/[^\d]/g, ''));
  const normal = toNum(matches[0]);
  const discount = matches.length > 1 ? toNum(matches[1]) : null;
  return { normal, discount };
}

function parseCsv(content) {
  const rows = [];
  let i = 0;
  let cur = [];
  let field = '';
  let inQuotes = false;
  while (i < content.length) {
    const ch = content[i];
    if (inQuotes) {
      if (ch === '"' && content[i + 1] === '"') {
        field += '"';
        i += 2;
        continue;
      }
      if (ch === '"') {
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
        continue;
      }
      if (ch === ',') {
        cur.push(field);
        field = '';
        i++;
        continue;
      }
      if (ch === '\n' || ch === '\r') {
        if (field !== '' || cur.length) {
          cur.push(field);
          rows.push(cur);
          cur = [];
          field = '';
        }
        if (ch === '\r' && content[i + 1] === '\n') i++;
        i++;
        continue;
      }
      field += ch;
      i++;
    }
  }
  if (field !== '' || cur.length) {
    cur.push(field);
    rows.push(cur);
  }
  return rows;
}

const hairText = fs.readFileSync(HAIRCARE_CSV, 'utf-8').replace(/^﻿/, '');
const hairRows = parseCsv(hairText);
const hairHeaders = hairRows[0];
const hairDataRows = hairRows.slice(1).filter((r) => r.length >= hairHeaders.length);

function pick(row, name) {
  const idx = hairHeaders.indexOf(name);
  return idx >= 0 ? row[idx] : null;
}

function categorizeHair(catRaw) {
  const c = (catRaw || '').toLowerCase();
  if (c.includes('mask')) return 'hair-treatment';
  if (c.includes('treatment')) return 'hair-treatment';
  if (c.includes('serum')) return 'haircare';
  return 'haircare';
}

const haircareProducts = hairDataRows.map((row, idx) => {
  const brand = clean(pick(row, 'brand'));
  const name = clean(pick(row, 'product_name'));
  const cat = clean(pick(row, 'category'));
  const priceRaw = clean(pick(row, 'price'));
  const ratingRaw = clean(pick(row, 'rating'));
  const reviewsRaw = clean(pick(row, 'number_of_reviews'));
  const { normal, discount } = parseHaircarePrice(priceRaw);
  const rating = ratingRaw && ratingRaw !== 'null' ? Number(ratingRaw) : null;
  const reviewMatch = reviewsRaw.match(/\d+/);
  const reviewCount = reviewMatch ? Number(reviewMatch[0]) : 0;
  return {
    id: `hr-${slug(name) || idx}-${idx}`,
    name,
    brand,
    productType: 'haircare',
    category: categorizeHair(cat),
    size: '',
    originalPrice: normal,
    discountedPrice: discount,
    discountPercent: discount && normal ? Math.round((1 - discount / normal) * 100) : 0,
    rating: Number.isFinite(rating) ? rating : null,
    reviewCount,
    ingredients: [],
    primaryIngredients: [],
    bpomId: null,
    claims: [],
    description: '',
    sourceUrl: clean(pick(row, 'link-href')),
    imageUrl: `https://picsum.photos/seed/${slug(brand)}-h${idx}/600/600`,
  };
});

const allProducts = [...skincareProducts, ...haircareProducts].filter(
  (p) => p.name && p.brand && p.originalPrice > 0
);

fs.writeFileSync(`${OUT}/products.json`, JSON.stringify(allProducts, null, 2));
console.log(`✓ products.json — ${allProducts.length} total (${skincareProducts.length} skincare + ${haircareProducts.length} haircare; ${allProducts.length} kept after filter)`);

// summary
const cats = {};
for (const p of allProducts) cats[p.category] = (cats[p.category] || 0) + 1;
console.log('  Categories:', cats);

// ingredient coverage
const ingMentions = new Set();
for (const p of allProducts) for (const i of p.ingredients) if (ingredientNameSet.has(i.toLowerCase())) ingMentions.add(i);
console.log(`  Ingredients in catalog also in INCI db: ${ingMentions.size}/${ingredients.length}`);
