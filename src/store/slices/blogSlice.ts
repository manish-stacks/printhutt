import { StateCreator } from 'zustand';
import { BlogPost } from '@/types';

export interface BlogSlice {
  blogPosts: BlogPost[];
  setBlogPosts: (posts: BlogPost[]) => void;
}

export const createBlogSlice: StateCreator<BlogSlice> = (set) => ({
  blogPosts: [],
  setBlogPosts: (posts) => set({ blogPosts: posts }),
});