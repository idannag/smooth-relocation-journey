
import { useQuery, useInfiniteQuery, UseQueryResult } from '@tanstack/react-query';

export interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
  categories: number[];
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Fetch posts with pagination
export const usePosts = (page: number) => {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: async () => {
      const response = await fetch(`https://app.ocean-il.co.il/wp-json/wp/v2/posts?_embed&status=publish&page=${page}&per_page=6`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      return response.json() as Promise<WordPressPost[]>;
    }
  });
};

// Fetch categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      // Check sessionStorage first
      const cachedCategories = sessionStorage.getItem('wp_categories');
      if (cachedCategories) {
        return JSON.parse(cachedCategories) as WordPressCategory[];
      }
      
      // If not cached, fetch from API
      const response = await fetch('https://app.ocean-il.co.il/wp-json/wp/v2/categories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const categories = await response.json() as WordPressCategory[];
      
      // Cache in sessionStorage
      sessionStorage.setItem('wp_categories', JSON.stringify(categories));
      
      return categories;
    }
  });
};

// Fetch single post by ID
export const useSinglePost = (id: string | undefined) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      if (!id) throw new Error('Post ID is required');
      
      const response = await fetch(`https://app.ocean-il.co.il/wp-json/wp/v2/posts/${id}?_embed`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      
      return response.json() as Promise<WordPressPost>;
    },
    enabled: !!id // Only run the query if ID is provided
  });
};

// Utility function to get featured image URL
export const getFeaturedImageUrl = (post: WordPressPost): string => {
  if (post._embedded && post._embedded['wp:featuredmedia'] && 
      post._embedded['wp:featuredmedia'][0] && 
      post._embedded['wp:featuredmedia'][0].source_url) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return '/placeholder.svg'; // Fallback image
};

// Utility function to get post categories
export const getPostCategories = (post: WordPressPost): Array<{id: number; name: string; slug: string}> => {
  if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
    return post._embedded['wp:term'][0];
  }
  return [];
};

// Utility function to create markup for rendering HTML content
export const createMarkup = (html: string) => {
  return { __html: html };
};
