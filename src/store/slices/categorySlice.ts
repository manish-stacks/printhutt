import { categoryService } from '@/_services/common/categoryService';
import { CategoryFormData } from '@/lib/types/category';
import { StateCreator } from 'zustand';

export interface CategorySlice {
  categories: CategoryFormData[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  getCategories: () => CategoryFormData[];
}

export const createCategorySlice: StateCreator<CategorySlice> = (set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await categoryService.getAll();
      set({ categories: response.categories, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      set({ error: errorMessage, isLoading: false });
      console.error('Error fetching categories:', error);
    }
  },

  getCategories: () => {
    const { categories, fetchCategories } = get();
  
    if (categories.length === 0) {
      fetchCategories();
    }
    
    return categories;
  },
});