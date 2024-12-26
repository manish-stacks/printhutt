import { ProductFormData } from "@/lib/types/product";


export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const validateProductForm = (formData: ProductFormData): string[] => {
  const errors: string[] = [];

  if (!formData.title) errors.push('Product title is required');
  if (!formData.description) errors.push('Product description is required');
  if (!formData.category) errors.push('Category is required');
  if (formData.price <= 0) errors.push('Price must be greater than 0');
  if (!formData.thumbnail) errors.push('Thumbnail image is required');
  if (formData.images.length === 0) errors.push('At least one gallery image is required');

  return errors;
};