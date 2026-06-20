export interface DIYPost {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string | null;
  category_id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration_minutes: number;
  tags: string[];
  likes_count: number;
  saves_count: number;
  created_at: string;
  categories?: Category;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  color: string;
  created_at: string;
}

export interface HowToVideo {
  id: string;
  title: string;
  thumbnail: string;
  source: string;
  duration: string;
  query: string;
}

export interface RetailerOption {
  id: string;
  name: string;
  priceRange: string;
  availability: 'in_stock' | 'limited' | 'check_availability';
  convenience: number;
  icon: string;
}

export interface AIToolOption {
  id: string;
  name: string;
  pricing: 'free' | 'freemium' | 'paid';
  action: string;
  icon: string;
}

export type ActiveView = 'explore' | 'scan' | 'categories';
