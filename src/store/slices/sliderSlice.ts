import { StateCreator } from 'zustand';
import { Slider } from '@/types';

export interface SliderSlice {
  sliders: Slider[];
  setSliders: (sliders: Slider[]) => void;
}

export const createSliderSlice: StateCreator<SliderSlice> = (set) => ({
  sliders: [],
  setSliders: (sliders) => set({ sliders }),
});