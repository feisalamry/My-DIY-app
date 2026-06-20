export interface ProductInfo {
  name: string;
  category: string;
  categorySlug: string;
  headline: string;
  searchQuery?: string;
}

const CATEGORIES = {
  tools: {
    name: 'Tools & Home DIY',
    slug: 'tools',
    headline: 'How people use this tool',
  },
  tech: {
    name: 'Tech & Electronics',
    slug: 'tech',
    headline: 'How people use this product',
  },
  software: {
    name: 'AI Tools & Software',
    slug: 'software',
    headline: 'How people use this tool',
  },
  home: {
    name: 'Home & Living',
    slug: 'home',
    headline: 'How people use this product',
  },
  craft: {
    name: 'Craft & Making',
    slug: 'craft',
    headline: 'How people use this material',
  },
  garden: {
    name: 'Garden & Outdoor',
    slug: 'garden',
    headline: 'How people use this product',
  },
} as const;

type CategoryKey = keyof typeof CATEGORIES;

interface KnownProduct {
  name: string;
  category: CategoryKey;
  searchQuery?: string;
}

const KNOWN_PRODUCTS: Record<string, KnownProduct> = {
  '038000138416': { name: 'Duct Tape', category: 'tools', searchQuery: 'how to use duct tape' },
  '038000138454': { name: 'Scotch Tape', category: 'craft', searchQuery: 'scotch tape crafting ideas' },
  '041631001116': { name: 'Windex Cleaner', category: 'home', searchQuery: 'how to clean windows streak free' },
  '037000322519': { name: 'Swiffer Duster', category: 'home', searchQuery: 'how to dust like a pro' },
  '011120160422': { name: 'Gorilla Glue', category: 'tools', searchQuery: 'how to use gorilla glue properly' },
  '026485002016': { name: '3M Sandpaper', category: 'tools', searchQuery: 'how to sand wood for beginners' },
  '051131901005': { name: 'WD-40 Spray', category: 'tools', searchQuery: 'WD-40 uses and tips' },
  '071662300241': { name: 'Sharpie Markers', category: 'craft', searchQuery: 'sharpie marker art ideas' },
  '014100090324': { name: 'Elmers Glue', category: 'craft', searchQuery: 'elmers glue crafts for kids' },
  '071662810006': { name: 'Expo Markers', category: 'craft', searchQuery: 'whiteboard marker tips' },
  '086876300014': { name: 'Command Strips', category: 'tools', searchQuery: 'how to use command strips' },
  '037000494419': { name: 'Febreze Spray', category: 'home', searchQuery: 'how to remove odors from fabric' },
  '023910900021': { name: 'Rust-Oleum Paint', category: 'tools', searchQuery: 'how to spray paint metal' },
  '070724000014': { name: 'Minwax Stain', category: 'tools', searchQuery: 'how to apply wood stain' },
  '082901000019': { name: 'J-B Weld Epoxy', category: 'tools', searchQuery: 'how to use jb weld epoxy' },
  '045244080001': { name: 'Milwaukee Drill Bit', category: 'tools', searchQuery: 'how to use power drill bits' },
  '008236103020': { name: 'DeWalt Screws', category: 'tools', searchQuery: 'how to choose the right screws' },
  '088591101012': { name: 'Kreg Pocket Hole Jig', category: 'tools', searchQuery: 'pocket hole jig tutorial' },
  '088384600017': { name: 'Dremel Rotary Tool', category: 'tools', searchQuery: 'dremel tool projects for beginners' },
  '009295402014': { name: 'Leatherman Multi-Tool', category: 'tools', searchQuery: 'multitool uses and tips' },
};

const CATEGORY_SEARCH_QUERIES: Record<CategoryKey, string[]> = {
  tools: ['power tools for beginners', 'DIY home repair tips', 'how to use hand tools', 'woodworking basics', 'tool storage ideas'],
  tech: ['tech setup guide', 'how to fix electronics', 'smart home tutorial', 'gadget reviews and tips', 'computer repair basics'],
  software: ['AI tools tutorial', 'productivity apps guide', 'automation for beginners', 'software tips and tricks', 'coding for beginners'],
  home: ['home organization tips', 'cleaning hacks', 'interior design ideas', 'home maintenance checklist', 'declutter your home'],
  craft: ['DIY craft ideas', 'creative projects at home', ' crafting for beginners', 'upcycling old items', 'art and craft tutorials'],
  garden: ['gardening for beginners', 'lawn care tips', 'grow your own vegetables', 'outdoor landscaping ideas', 'plant care guide'],
};

function inferCategoryFromBarcode(barcode: string): { categoryKey: CategoryKey; searchQuery: string } {
  const prefix = barcode.substring(0, 1);
  const prefix3 = barcode.substring(0, 3);

  let categoryKey: CategoryKey;

  if (prefix3 >= '000' && prefix3 <= '139') categoryKey = 'tools';
  else if (prefix3 >= '200' && prefix3 <= '299') categoryKey = 'software';
  else if (prefix3 >= '300' && prefix3 <= '449') categoryKey = 'tech';
  else if (prefix3 >= '500' && prefix3 <= '699') categoryKey = 'home';
  else if (prefix3 >= '700' && prefix3 <= '849') categoryKey = 'craft';
  else if (prefix === '9') categoryKey = 'garden';
  else categoryKey = 'tools';

  const queries = CATEGORY_SEARCH_QUERIES[categoryKey];
  const searchQuery = queries[Math.floor(parseInt(barcode.slice(-2), 10) % queries.length)];

  return { categoryKey, searchQuery };
}

export function lookupProduct(barcode: string): ProductInfo {
  const known = KNOWN_PRODUCTS[barcode];

  if (known) {
    const cat = CATEGORIES[known.category];
    return {
      name: known.name,
      category: cat.name,
      categorySlug: cat.slug,
      headline: cat.headline,
      searchQuery: known.searchQuery,
    };
  }

  const { categoryKey, searchQuery } = inferCategoryFromBarcode(barcode);
  const cat = CATEGORIES[categoryKey];

  return {
    name: `Product ${barcode.slice(-4)}`,
    category: cat.name,
    categorySlug: cat.slug,
    headline: cat.headline,
    searchQuery,
  };
}
