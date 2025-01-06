import { StateCreator } from 'zustand';
import { Testimonial } from '@/types';

export interface TestimonialSlice {
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
}

export const createTestimonialSlice: StateCreator<TestimonialSlice> = (set) => ({
  testimonials: [],
  setTestimonials: (testimonials) => set({ testimonials }),
});