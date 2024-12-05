import { FaHome, FaLayerGroup, FaTag } from "react-icons/fa";


export const menuItems = {
  categories: [
    { id: 'categories', label: 'Categories', path: '/admin/categories' },
    { id: 'addcategories', label: 'Add Categories', path: '/admin/categories/add' },
  ],
  products: [
    { id: 'products-list', label: 'Products List', path: '/admin/products' },
    { id: 'add-product', label: 'Add Product', path: '/admin/products/add' },
    { id: 'product-reviews', label: 'Product Reviews', path: '/admin/products/reviews' },
  ],
};

export const mainMenuItems = [
  {
    id: 'dashboard',
    icon: FaHome,
    label: 'Dashboard',
    path: '/admin/dashboard',
  },
  {
    id: 'categories',
    icon: FaTag,
    label: 'Manage Categories',
    submenu: menuItems.categories,
  },
  {
    id: 'products',
    icon: FaLayerGroup,
    label: 'Products',
    submenu: menuItems.products,
  },
];