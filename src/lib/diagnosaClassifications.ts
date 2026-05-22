import type { DiagnosaResult } from '@/types';

type Template = Omit<DiagnosaResult, 'method' | 'generatedAt' | 'type'>;

export const SKIN_CLASSIFICATIONS: Record<string, Template> = {
  'acne-oily': {
    classificationKey: 'acne-oily',
    skin_type: 'Acne-Prone Oily Skin',
    classification: 'Kulit Berminyak dengan Jerawat Aktif',
    explanation:
      'Kulit kamu menghasilkan sebum berlebih yang menyumbat pori-pori dan memicu jerawat aktif. Fokus utamanya adalah membersihkan dengan lembut, mengontrol produksi minyak, dan menenangkan peradangan tanpa mengiritasi.',
    do: [
      'Cuci muka 2x sehari dengan cleanser bebas sulfat',
      'Gunakan toner mengandung niacinamide atau BHA',
      'Pakai pelembab oil-free non-komedogenik',
      'Pakai sunscreen SPF 30+ setiap pagi',
    ],
    dont: [
      'Hindari produk berbahan alkohol denat tinggi',
      'Jangan pakai scrub fisik kasar saat jerawat aktif',
      'Hindari minyak komedogenik seperti coconut oil',
      'Jangan tidur dengan makeup',
    ],
    needed_ingredients: ['Niacinamide', 'Salicylic Acid', 'Centella Asiatica Extract', 'Hyaluronic Acid', 'Zinc PCA'],
  },
  'dehydrated-sensitive': {
    classificationKey: 'dehydrated-sensitive',
    skin_type: 'Dehydrated Sensitive Skin',
    classification: 'Kulit Sensitif & Dehidrasi',
    explanation:
      'Skin barrier kamu sedang lemah — kulit terasa kering meskipun bisa juga berminyak (dehidrasi ≠ kering). Prioritasnya membangun ulang barrier dengan formulasi minimalis dan menenangkan.',
    do: [
      'Gunakan cleanser pH-balanced yang creamy',
      'Layer hydrating toner sebelum serum',
      'Pakai pelembab dengan ceramide & panthenol',
      'Selalu pakai sunscreen mineral yang gentle',
    ],
    dont: [
      'Hindari exfoliating acid tiap hari',
      'Jangan layer terlalu banyak active ingredients',
      'Hindari fragrance & essential oil',
      'Jangan air panas saat cuci muka',
    ],
    needed_ingredients: ['Ceramide NP', 'Panthenol', 'Hyaluronic Acid', 'Centella Asiatica Extract', 'Allantoin'],
  },
  'dry-mature': {
    classificationKey: 'dry-mature',
    skin_type: 'Dry Mature Skin',
    classification: 'Kulit Kering & Matang',
    explanation:
      'Produksi minyak alami kulit mulai menurun, ditandai dengan kekeringan, garis halus, dan tekstur yang kurang kenyal. Fokus pada hidrasi mendalam dan regenerasi sel.',
    do: [
      'Cleanser oil-based atau milk cleanser',
      'Pakai serum dengan peptide & retinoid (malam)',
      'Gunakan pelembab kaya dengan squalane',
      'SPF 50 setiap hari tanpa kompromi',
    ],
    dont: [
      'Hindari foaming cleanser yang harsh',
      'Jangan skip pelembab walaupun lembap',
      'Hindari toner berbasis alkohol',
      'Jangan mulai retinoid tanpa adaptasi',
    ],
    needed_ingredients: ['Retinol', 'Peptide Complex', 'Squalane', 'Hyaluronic Acid', 'Vitamin E'],
  },
  'combination-dull': {
    classificationKey: 'combination-dull',
    skin_type: 'Combination Dull Skin',
    classification: 'Kulit Kombinasi Kusam',
    explanation:
      'T-zone kamu cenderung berminyak sementara pipi normal-ke-kering, ditambah warna kulit terlihat kurang merata dan tidak bercahaya. Strategi: brightening + balancing.',
    do: [
      'Pakai cleanser gel ringan',
      'Tambahkan Vitamin C di pagi hari',
      'Gunakan exfoliant ringan 2-3x seminggu',
      'Mask hidrasi 1-2x seminggu',
    ],
    dont: [
      'Hindari pelembab terlalu berat untuk T-zone',
      'Jangan over-exfoliate sampai kulit perih',
      'Hindari sunscreen yang meninggalkan white cast',
      'Jangan tidur kurang dari 6 jam',
    ],
    needed_ingredients: ['Vitamin C (Ascorbic Acid)', 'Niacinamide', 'Glycolic Acid', 'Alpha-Arbutin', 'Hyaluronic Acid'],
  },
  'normal-healthy': {
    classificationKey: 'normal-healthy',
    skin_type: 'Normal Healthy Skin',
    classification: 'Kulit Normal Sehat',
    explanation:
      'Selamat — kulit kamu dalam kondisi seimbang. Tujuanmu sekarang adalah maintenance dan pencegahan: jaga barrier, lindungi dari UV, dan support dengan antioksidan.',
    do: [
      'Konsisten dengan rutinitas dasar (cleanse-moisturize-SPF)',
      'Pakai antioksidan untuk pencegahan',
      'Hidrasi cukup dari dalam (air & tidur)',
      'Pakai sunscreen broad-spectrum setiap hari',
    ],
    dont: [
      'Jangan tergoda mencoba semua tren skincare',
      'Hindari over-treatment yang justru merusak barrier',
      'Jangan skip sunscreen di hari mendung',
      'Hindari produk tanpa research',
    ],
    needed_ingredients: ['Niacinamide', 'Hyaluronic Acid', 'Vitamin E', 'Green Tea Extract', 'Panthenol'],
  },
  'oily-congested': {
    classificationKey: 'oily-congested',
    skin_type: 'Oily Congested Skin',
    classification: 'Kulit Berminyak dengan Komedo',
    explanation:
      'Produksi sebum tinggi dengan banyak komedo (blackheads/whiteheads) di sekitar hidung dan dagu, tapi tidak banyak jerawat aktif. Fokus: exfoliation kimia & pori bersih.',
    do: [
      'Double cleanse di malam hari',
      'BHA 2-3x seminggu untuk unclog pores',
      'Pelembab oil-free berbasis gel',
      'Clay mask 1x seminggu',
    ],
    dont: [
      'Jangan ekstraksi komedo manual',
      'Hindari pore strip yang harsh',
      'Jangan over-cleanse sampai kulit kering',
      'Hindari makeup heavy & comedogenic',
    ],
    needed_ingredients: ['Salicylic Acid', 'Niacinamide', 'Kaolin', 'Zinc PCA', 'Hyaluronic Acid'],
  },
  'hyperpigmented': {
    classificationKey: 'hyperpigmented',
    skin_type: 'Hyperpigmented Skin',
    classification: 'Kulit dengan Bekas Jerawat & Flek',
    explanation:
      'Bekas jerawat (PIH) atau flek matahari membuat kulit terlihat tidak merata. Brightening agents + sunscreen ketat akan jadi best friend kamu.',
    do: [
      'Pakai Vitamin C / Alpha-Arbutin di pagi hari',
      'Niacinamide untuk fade dark spots',
      'SPF 50+ wajib (UV memperburuk PIH)',
      'Sabar — fading PIH butuh 3-6 bulan',
    ],
    dont: [
      'Jangan pencet jerawat (memperburuk PIH)',
      'Hindari skip sunscreen, walau indoor',
      'Jangan campur Vit C + Retinol langsung',
      'Hindari produk hidroquinon tanpa dokter',
    ],
    needed_ingredients: ['Alpha-Arbutin', 'Niacinamide', 'Vitamin C (Ascorbic Acid)', '3-O-Ethyl Ascorbic Acid', 'Tranexamic Acid'],
  },
  'sensitive-reactive': {
    classificationKey: 'sensitive-reactive',
    skin_type: 'Sensitive Reactive Skin',
    classification: 'Kulit Sensitif Reaktif',
    explanation:
      'Kulit kamu mudah memerah, perih, atau iritasi dengan banyak produk. Mode-nya: minimalist routine, soothing ingredients, dan patch-test wajib.',
    do: [
      'Patch test setiap produk baru di rahang',
      'Pakai cleanser cream tanpa fragrance',
      'Fokus pada soothing: centella, panthenol',
      'Sunscreen mineral (titanium/zinc)',
    ],
    dont: [
      'Hindari fragrance, essential oils, alcohol',
      'Jangan double cleanse jika tidak perlu',
      'Hindari exfoliant fisik & enzim agresif',
      'Jangan layer 5+ produk sekaligus',
    ],
    needed_ingredients: ['Centella Asiatica Extract', 'Panthenol', 'Allantoin', 'Madecassoside', 'Bisabolol'],
  },
};

export const HAIR_CLASSIFICATIONS: Record<string, Template> = {
  'oily-scalp': {
    classificationKey: 'oily-scalp',
    skin_type: 'Oily Scalp',
    classification: 'Kulit Kepala Berminyak',
    explanation:
      'Kelenjar sebum di kulit kepala memproduksi minyak berlebih, membuat rambut cepat lepek 1-2 hari setelah keramas. Solusi: clarifying gentle + scalp balancing.',
    do: [
      'Keramas dengan shampoo clarifying ringan',
      'Fokuskan shampoo ke scalp, kondisioner ke ujung',
      'Pakai scalp serum kontrol minyak 2-3x seminggu',
      'Bilas dengan air dingin di akhir',
    ],
    dont: [
      'Jangan kondisioner di scalp',
      'Hindari produk styling berat (oil-based)',
      'Jangan over-wash sampai scalp irit',
      'Hindari menyisir scalp terlalu sering',
    ],
    needed_ingredients: ['Salicylic Acid', 'Tea Tree Extract', 'Niacinamide', 'Zinc PCA', 'Green Tea Extract'],
  },
  'dry-damaged': {
    classificationKey: 'dry-damaged',
    skin_type: 'Dry Damaged Hair',
    classification: 'Rambut Kering & Rusak',
    explanation:
      'Kutikula rambut sudah rusak akibat heat styling, chemical treatment, atau lingkungan. Tujuannya: deep moisture + protein rebuilding.',
    do: [
      'Pakai shampoo sulfate-free yang creamy',
      'Hair mask protein 1x seminggu',
      'Leave-in conditioner setiap habis keramas',
      'Pakai heat protectant sebelum styling',
    ],
    dont: [
      'Hindari styling tools >180°C',
      'Jangan keramas air panas',
      'Hindari shampoo dengan SLS',
      'Jangan sikat rambut basah secara kasar',
    ],
    needed_ingredients: ['Hydrolyzed Keratin', 'Argan Oil', 'Panthenol', 'Hydrolyzed Silk', 'Glycerin'],
  },
  'dandruff': {
    classificationKey: 'dandruff',
    skin_type: 'Dandruff-Prone Scalp',
    classification: 'Kulit Kepala Berketombe',
    explanation:
      'Kulit kepala mengalami pengelupasan berlebih (ketombe), bisa karena jamur Malassezia atau dermatitis seboroik. Butuh antifungal + soothing approach.',
    do: [
      'Pakai shampoo anti-dandruff 2-3x seminggu',
      'Massage scalp saat keramas',
      'Bilas sampai bersih jangan ada residu',
      'Konsultasi dokter jika gatal parah',
    ],
    dont: [
      'Jangan garuk scalp keras',
      'Hindari produk styling kontak langsung scalp',
      'Jangan pakai topi terlalu lama saat berkeringat',
      'Hindari diet tinggi gula berlebihan',
    ],
    needed_ingredients: ['Zinc Pyrithione', 'Salicylic Acid', 'Tea Tree Extract', 'Piroctone Olamine', 'Centella Asiatica Extract'],
  },
  'hair-fall': {
    classificationKey: 'hair-fall',
    skin_type: 'Hair Fall Concern',
    classification: 'Rambut Rontok',
    explanation:
      'Rambut rontok melebihi 100 helai/hari bisa disebabkan stress, hormonal, atau scalp kurang sehat. Fokus: stimulasi folikel + nutrisi scalp.',
    do: [
      'Pakai shampoo anti-hair-fall berbahan biotin',
      'Scalp serum dengan caffeine atau peptide',
      'Pijat scalp 5 menit sebelum keramas',
      'Cukupi protein dalam diet',
    ],
    dont: [
      'Hindari hair tie terlalu kencang',
      'Jangan blow dry suhu max',
      'Hindari over-styling chemical',
      'Jangan ignore kalau rontok parah — cek dokter',
    ],
    needed_ingredients: ['Biotin', 'Caffeine', 'Niacinamide', 'Copper Tripeptide-1', 'Panthenol'],
  },
  'color-treated': {
    classificationKey: 'color-treated',
    skin_type: 'Color-Treated Hair',
    classification: 'Rambut yang Diwarnai',
    explanation:
      'Pewarnaan membuka kutikula rambut sehingga rentan kering & fade. Prioritas: color protection + barrier repair.',
    do: [
      'Pakai shampoo color-safe sulfate-free',
      'Hair mask 1x seminggu',
      'Spray UV protection sebelum keluar',
      'Tunda keramas 48 jam setelah dye',
    ],
    dont: [
      'Hindari air keras (hard water) — pakai filter',
      'Jangan keramas tiap hari',
      'Hindari clarifying shampoo terlalu sering',
      'Jangan langsung renang di pool tanpa proteksi',
    ],
    needed_ingredients: ['Hydrolyzed Keratin', 'Argan Oil', 'UV Filter', 'Panthenol', 'Quaternium-22'],
  },
  'normal-hair': {
    classificationKey: 'normal-hair',
    skin_type: 'Normal Healthy Hair',
    classification: 'Rambut Normal Sehat',
    explanation:
      'Rambutmu dalam kondisi prima. Strategi sekarang adalah preserve & prevent dengan rutinitas seimbang yang tidak over-process.',
    do: [
      'Keramas sesuai kebutuhan (3-4x seminggu)',
      'Kondisioner mid-to-ends',
      'Trim 2-3 bulan sekali',
      'Tidur dengan satin pillowcase',
    ],
    dont: [
      'Jangan over-shampoo',
      'Hindari heat styling tiap hari',
      'Jangan tarik rambut basah saat menyisir',
      'Hindari chemical treatment beruntun',
    ],
    needed_ingredients: ['Panthenol', 'Argan Oil', 'Glycerin', 'Hydrolyzed Silk', 'Vitamin E'],
  },
};
