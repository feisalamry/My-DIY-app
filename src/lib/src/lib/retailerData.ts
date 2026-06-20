import type { RetailerOption, AIToolOption } from '../types';

const CATEGORY_RETAILERS: Record<string, RetailerOption[]> = {
  tools: [
    { id: 'hd-t1', name: 'Home Depot', priceRange: '$5 - $45', availability: 'in_stock', convenience: 1, icon: 'store' },
    { id: 'lw-t1', name: "Lowe's", priceRange: '$5 - $50', availability: 'in_stock', convenience: 2, icon: 'store' },
    { id: 'am-t1', name: 'Amazon', priceRange: '$4 - $40', availability: 'in_stock', convenience: 3, icon: 'truck' },
    { id: 'wm-t1', name: 'Walmart', priceRange: '$5 - $35', availability: 'limited', convenience: 4, icon: 'store' },
    { id: 'ac-t1', name: 'Ace Hardware', priceRange: '$6 - $50', availability: 'check_availability', convenience: 5, icon: 'store' },
  ],
  tech: [
    { id: 'am-e1', name: 'Amazon', priceRange: '$15 - $200', availability: 'in_stock', convenience: 1, icon: 'truck' },
    { id: 'bb-e1', name: 'Best Buy', priceRange: '$20 - $250', availability: 'in_stock', convenience: 2, icon: 'store' },
    { id: 'nw-e1', name: 'Newegg', priceRange: '$15 - $180', availability: 'in_stock', convenience: 3, icon: 'truck' },
    { id: 'ms-e1', name: 'Micro Center', priceRange: '$18 - $220', availability: 'limited', convenience: 4, icon: 'store' },
  ],
  home: [
    { id: 'hd-h1', name: 'Home Depot', priceRange: '$3 - $30', availability: 'in_stock', convenience: 1, icon: 'store' },
    { id: 'lw-h1', name: "Lowe's", priceRange: '$3 - $35', availability: 'in_stock', convenience: 2, icon: 'store' },
    { id: 'am-h1', name: 'Amazon', priceRange: '$3 - $25', availability: 'in_stock', convenience: 3, icon: 'truck' },
    { id: 'tg-h1', name: 'Target', priceRange: '$4 - $30', availability: 'limited', convenience: 4, icon: 'store' },
    { id: 'wm-h1', name: 'Walmart', priceRange: '$3 - $28', availability: 'in_stock', convenience: 5, icon: 'store' },
  ],
  craft: [
    { id: 'ms-c1', name: "Michaels", priceRange: '$4 - $25', availability: 'in_stock', convenience: 1, icon: 'store' },
    { id: 'js-c1', name: "Joann's", priceRange: '$3 - $30', availability: 'in_stock', convenience: 2, icon: 'store' },
    { id: 'am-c1', name: 'Amazon', priceRange: '$4 - $20', availability: 'in_stock', convenience: 3, icon: 'truck' },
    { id: 'wm-c1', name: 'Walmart', priceRange: '$3 - $22', availability: 'limited', convenience: 4, icon: 'store' },
  ],
  garden: [
    { id: 'hd-g1', name: 'Home Depot', priceRange: '$5 - $60', availability: 'in_stock', convenience: 1, icon: 'store' },
    { id: 'lw-g1', name: "Lowe's", priceRange: '$5 - $55', availability: 'in_stock', convenience: 2, icon: 'store' },
    { id: 'am-g1', name: 'Amazon', priceRange: '$6 - $50', availability: 'in_stock', convenience: 3, icon: 'truck' },
    { id: 'tg-g1', name: 'Target', priceRange: '$8 - $45', availability: 'limited', convenience: 4, icon: 'store' },
  ],
  software: [],
};

const AI_TOOLS: Record<string, AIToolOption[]> = {
  software: [
    { id: 'ai1', name: 'ChatGPT', pricing: 'freemium', action: 'Open tool', icon: 'bot' },
    { id: 'ai2', name: 'Claude', pricing: 'freemium', action: 'Open tool', icon: 'bot' },
    { id: 'ai3', name: 'Midjourney', pricing: 'paid', action: 'Open tool', icon: 'palette' },
    { id: 'ai4', name: 'GitHub Copilot', pricing: 'paid', action: 'Open tool', icon: 'code' },
    { id: 'ai5', name: 'Stable Diffusion', pricing: 'free', action: 'Open tool', icon: 'image' },
    { id: 'ai6', name: 'Notion AI', pricing: 'freemium', action: 'Open tool', icon: 'file' },
  ],
};

const PRODUCT_RETAILERS: Record<string, RetailerOption[]> = {
  'Duct Tape': [
    { id: 'hd-dt', name: 'Home Depot', priceRange: '$7 - $12', availability: 'in_stock', convenience: 1, icon: 'store' },
    { id: 'lw-dt', name: "Lowe's", priceRange: '$6 - $11', availability: 'in_stock', convenience: 2, icon: 'store' },
    { id: 'am-dt', name: 'Amazon', priceRange: '$5 - $15', availability: 'in_stock', convenience: 3, icon: 'truck' },
    { id: 'wm-dt', name: 'Walmart', priceRange: '$5 - $10', availability: 'in_stock', convenience: 4, icon: 'store' },
    { id: 'ac-dt', name: 'Ace Hardware', priceRange: '$7 - $13', availability: 'limited', convenience: 5, icon: 'store' },
  ],
  'WD-40 Spray': [
    { id: 'hd-wd', name: 'Home Depot', priceRange: '$5 - $9', availability: 'in_stock', convenience: 1, icon: 'store' },
    { id: 'lw-wd', name: "Lowe's", priceRange: '$5 - $10', availability: 'in_stock', convenience: 2, icon: 'store' },
    { id: 'am-wd', name: 'Amazon', priceRange: '$4 - $12', availability: 'in_stock', convenience: 3, icon: 'truck' },
    { id: 'wm-wd', name: 'Walmart', priceRange: '$4 - $8', availability: 'in_stock', convenience: 4, icon: 'store' },
  ],
  'Gorilla Glue': [
    { id: 'hd-gg', name: 'Home Depot', priceRange: '$6 - $14', availability: 'in_stock', convenience: 1, icon: 'store' },
    { id: 'lw-gg', name: "Lowe's", priceRange: '$6 - $15', availability: 'in_stock', convenience: 2, icon: 'store' },
    { id: 'am-gg', name: 'Amazon', priceRange: '$5 - $18', availability: 'in_stock', convenience: 3, icon: 'truck' },
    { id: 'wm-gg', name: 'Walmart', priceRange: '$5 - $12', availability: 'limited', convenience: 4, icon: 'store' },
  ],
};

export interface WhereToGetItData {
  retailers: RetailerOption[];
  aiTools: AIToolOption[];
  isAIToolCategory: boolean;
}

export function getWhereToGetIt(productName: string, categorySlug: string): WhereToGetItData {
  const productRetailers = PRODUCT_RETAILERS[productName];
  const categoryRetailers = CATEGORY_RETAILERS[categorySlug] || CATEGORY_RETAILERS.tools;
  const aiTools = AI_TOOLS[categorySlug] || [];
  const isAIToolCategory = categorySlug === 'software';

  let retailers: RetailerOption[];
  if (productRetailers) {
    const seen = new Set<string>();
    retailers = [...productRetailers, ...categoryRetailers].filter((r) => {
      if (seen.has(r.name)) return false;
      seen.add(r.name);
      return true;
    });
  } else {
    retailers = categoryRetailers;
  }

  retailers.sort((a, b) => a.convenience - b.convenience);

  return {
    retailers,
    aiTools,
    isAIToolCategory,
  };
}
