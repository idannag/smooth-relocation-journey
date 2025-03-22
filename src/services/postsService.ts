
import { useQuery } from '@tanstack/react-query';

export interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
  link: string;
  categories: number[];
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const WP_API_URL = 'https://app.ocean-il.co.il/wp-json/wp/v2';

// Helper function to cache categories in sessionStorage
const cacheCategories = (categories: WordPressCategory[]) => {
  sessionStorage.setItem('wp_categories', JSON.stringify(categories));
  sessionStorage.setItem('wp_categories_timestamp', Date.now().toString());
};

// Helper function to get cached categories
const getCachedCategories = (): WordPressCategory[] | null => {
  const categoriesJson = sessionStorage.getItem('wp_categories');
  const timestamp = sessionStorage.getItem('wp_categories_timestamp');
  
  if (!categoriesJson || !timestamp) return null;
  
  // Cache for 1 hour
  const ONE_HOUR = 60 * 60 * 1000;
  if (Date.now() - parseInt(timestamp) > ONE_HOUR) return null;
  
  try {
    return JSON.parse(categoriesJson);
  } catch (e) {
    return null;
  }
};

// Fetch posts with pagination
export const fetchPosts = async (page = 1, perPage = 6): Promise<WordPressPost[]> => {
  const response = await fetch(
    `${WP_API_URL}/posts?_embed&status=publish&page=${page}&per_page=${perPage}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
};

// Fetch categories
export const fetchCategories = async (): Promise<WordPressCategory[]> => {
  // Try to get from cache first
  const cachedCategories = getCachedCategories();
  if (cachedCategories) {
    return cachedCategories;
  }
  
  // Fetch from API if not in cache
  const response = await fetch(`${WP_API_URL}/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  const categories = await response.json();
  
  // Cache the results
  cacheCategories(categories);
  
  return categories;
};

// Fetch a single post by ID
export const fetchPost = async (id: string): Promise<WordPressPost> => {
  const response = await fetch(`${WP_API_URL}/posts/${id}?_embed`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  
  return response.json();
};

// React Query hooks
export const usePosts = (page = 1, perPage = 6) => {
  return useQuery({
    queryKey: ['posts', page, perPage],
    queryFn: () => fetchPosts(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Helper to get featured image URL
export const getFeaturedImageUrl = (post: WordPressPost): string => {
  if (post._embedded && 
      post._embedded['wp:featuredmedia'] && 
      post._embedded['wp:featuredmedia'][0] &&
      post._embedded['wp:featuredmedia'][0].source_url) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  
  // Return a placeholder if no featured image
  return 'https://placehold.co/600x400/e5e7eb/a1a1aa?text=No+Image';
};

// Helper to get categories for a post
export const getPostCategories = (post: WordPressPost): Array<{id: number, name: string}> => {
  if (post._embedded && 
      post._embedded['wp:term'] && 
      post._embedded['wp:term'][0]) {
    return post._embedded['wp:term'][0];
  }
  return [];
};

// Helper to safely parse HTML content
export const createMarkup = (html: string) => {
  return { __html: html };
};
