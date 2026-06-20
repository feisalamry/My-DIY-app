import type { ProductInfo } from './productLookup';

interface AnalysisResult {
  product: ProductInfo;
  confidence: 'high' | 'medium' | 'low';
}

// Category keywords for simple heuristic matching
const CATEGORY_KEYWORDS: Record<string, { keywords: string[]; category: string; categorySlug: string; headline: string; searchQueries: string[] }> = {
  tools: {
    keywords: ['drill', 'screwdriver', 'hammer', 'wrench', 'saw', 'tool', 'toolkit', 'toolbox', 'screws', 'nails', 'bolt', 'nut', 'plier', 'tape measure', 'level', 'utility knife', 'power tool', 'cordless', 'dremel', 'sander', 'glue', 'epoxy', 'adhesive', 'sealant'],
    category: 'Tools & Home DIY',
    categorySlug: 'tools',
    headline: 'How people use this tool',
    searchQueries: ['how to use power tools safely', 'DIY home repair basics', 'essential tools for beginners', 'tool maintenance tips', 'home improvement projects'],
  },
  tech: {
    keywords: ['phone', 'laptop', 'computer', 'tablet', 'headphone', 'earbud', 'speaker', 'cable', 'charger', 'usb', 'hdmi', 'keyboard', 'mouse', 'monitor', 'router', 'hard drive', 'ssd', 'memory', 'ram', 'battery', 'screen', 'camera', 'drone', 'smartwatch', 'fitness tracker'],
    category: 'Tech & Electronics',
    categorySlug: 'tech',
    headline: 'How people use this product',
    searchQueries: ['tech setup guide for beginners', 'how to fix common electronics issues', 'smart home device tutorial', 'gadget maintenance tips', 'computer troubleshooting basics'],
  },
  software: {
    keywords: ['software', 'app', 'application', 'subscription', 'license', 'ai', 'chatgpt', 'copilot', 'api', 'sdk', 'platform', 'saas', 'cloud', 'server', 'database', 'code', 'programming'],
    category: 'AI Tools & Software',
    categorySlug: 'software',
    headline: 'How people use this tool',
    searchQueries: ['AI tools tutorial for beginners', 'how to use ChatGPT effectively', 'productivity software tips', 'automation tools guide', 'best AI assistants compared'],
  },
  home: {
    keywords: ['furniture', 'chair', 'table', 'desk', 'lamp', 'light', 'rug', 'curtain', 'pillow', 'blanket', 'towel', 'sheet', 'bedding', 'mattress', 'shelf', 'storage', 'organizer', 'basket', 'cleaning', 'vacuum', 'mop', 'broom', 'detergent', 'soap', 'tissue', 'paper towel', 'trash', 'kitchen', 'appliance', 'blender', 'toaster', 'microwave', 'coffee maker', 'pot', 'pan', 'utensil'],
    category: 'Home & Living',
    categorySlug: 'home',
    headline: 'How people use this product',
    searchQueries: ['home organization tips and tricks', 'cleaning hacks that work', 'interior design on a budget', 'home maintenance checklist', 'declutter your living space'],
  },
  craft: {
    keywords: ['paint', 'brush', 'canvas', 'marker', 'pen', 'pencil', 'paper', 'notebook', 'sketchbook', 'scissors', 'glue', 'tape', 'ribbon', 'fabric', 'yarn', 'thread', 'needle', 'sewing', 'embroidery', 'knitting', 'crochet', 'bead', 'jewelry', 'clay', 'resin', 'mold', 'craft', 'sticker', 'washi', 'stamp', 'ink'],
    category: 'Craft & Making',
    categorySlug: 'craft',
    headline: 'How to use this material',
    searchQueries: ['DIY craft projects for beginners', 'creative upcycling ideas', 'crafting with household items', 'art techniques tutorial', 'handmade gift ideas'],
  },
  garden: {
    keywords: ['plant', 'flower', 'seed', 'soil', 'pot', 'watering', 'garden', 'shovel', 'rake', 'hose', 'fertilizer', 'mulch', 'compost', 'pruner', 'shears', 'glove', 'outdoor', 'patio', 'deck', 'fence', 'lawn', 'mower', 'hedge', 'tree', 'bush', 'herb', 'vegetable'],
    category: 'Garden & Outdoor',
    categorySlug: 'garden',
    headline: 'How people use this product',
    searchQueries: ['gardening for complete beginners', 'how to grow vegetables at home', 'lawn care made easy', 'outdoor landscaping ideas', 'plant care essentials'],
  },
};

// Simulated product names for demo purposes
const SIMULATED_PRODUCTS: Record<string, string[]> = {
  tools: ['Power Drill', 'Utility Tool', 'DIY Toolkit', 'Hand Tool', 'Workshop Essential'],
  tech: ['Electronic Device', 'Tech Gadget', 'Digital Accessory', 'Smart Device', 'Tech Component'],
  software: ['AI Software Tool', 'Digital Platform', 'Productivity App', 'Automation Tool', 'Smart Assistant'],
  home: ['Home Essential', 'Household Item', 'Living Product', 'Home Accessory', 'Daily Essential'],
  craft: ['Craft Supply', 'Art Material', 'Creative Tool', 'DIY Material', 'Making Essential'],
  garden: ['Garden Tool', 'Outdoor Essential', 'Plant Care Item', 'Lawn Equipment', 'Garden Supply'],
};

function inferFromKeywords(description: string): { categorySlug: string; categoryName: string; headline: string; searchQuery: string } {
  const lowerDesc = description.toLowerCase();

  for (const [, data] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of data.keywords) {
      if (lowerDesc.includes(keyword)) {
        const searchQuery = data.searchQueries[Math.floor(Math.random() * data.searchQueries.length)];
        return {
          categorySlug: data.categorySlug,
          categoryName: data.category,
          headline: data.headline,
          searchQuery,
        };
      }
    }
  }

  // Default to tools if no match
  const defaultData = CATEGORY_KEYWORDS.tools;
  return {
    categorySlug: 'tools',
    categoryName: 'Tools & Home DIY',
    headline: 'How people use this tool',
    searchQuery: defaultData.searchQueries[Math.floor(Math.random() * defaultData.searchQueries.length)],
  };
}

function getRandomProductName(categorySlug: string): string {
  const products = SIMULATED_PRODUCTS[categorySlug] || SIMULATED_PRODUCTS.tools;
  return products[Math.floor(Math.random() * products.length)];
}

// Simulate AI image analysis with a realistic delay
// In production, this would call an AI vision API (e.g., via Supabase Edge Function)
export async function analyzeImage(_imageDataUrl: string): Promise<AnalysisResult> {
  // Simulate network latency for AI analysis
  await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));

  // In a real implementation, we would:
  // 1. Send the image to an AI vision API (Claude, GPT-4 Vision, Google Vision, etc.)
  // 2. Parse the response to extract product/category information
  // 3. Map the result to our category system

  // For demo, we use a random category with weighted distribution
  const categories = ['tools', 'tech', 'home', 'craft', 'garden', 'software'] as const;
  const weights = [25, 20, 20, 15, 10, 10];

  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  let selectedCategory: typeof categories[number] = 'tools';

  for (let i = 0; i < categories.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      selectedCategory = categories[i];
      break;
    }
  }

  const categoryData = CATEGORY_KEYWORDS[selectedCategory];
  const productName = getRandomProductName(selectedCategory);
  const searchQuery = categoryData.searchQueries[Math.floor(Math.random() * categoryData.searchQueries.length)];

  // Determine confidence based on "analysis quality"
  const confidence: 'high' | 'medium' | 'low' =
    Math.random() > 0.3 ? 'medium' :
    Math.random() > 0.5 ? 'high' : 'low';

  return {
    product: {
      name: productName,
      category: categoryData.category,
      categorySlug: categoryData.categorySlug,
      headline: categoryData.headline,
      searchQuery,
    },
    confidence,
  };
}

// Export a function that can be used with a text description
// This allows for future integration with actual AI descriptions
export async function analyzeFromDescription(description: string): Promise<AnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const { categorySlug, categoryName, headline, searchQuery } = inferFromKeywords(description);
  const productName = getRandomProductName(categorySlug);

  return {
    product: {
      name: productName,
      category: categoryName,
      categorySlug,
      headline,
      searchQuery,
    },
    confidence: 'medium',
  };
}
