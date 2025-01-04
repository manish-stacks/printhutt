import { FaBook, FaBroom, FaHome, FaLayerGroup, FaQuestionCircle, FaRandom, FaRssSquare, FaTag, FaTasks, FaUsers } from "react-icons/fa";
import { RiLuggageCartFill, RiReceiptFill } from "react-icons/ri";


export const menuItems = {
  categories: [
    { id: 'categories', label: 'Categories', path: '/admin/categories' },
    { id: 'sub-categories', label: 'Sub Categories', path: '/admin/sub-categories' },
  ],
  subcategories: [
    { id: 'categories', label: 'Categories', path: '/admin/sub-categories' },
    { id: 'addcategories', label: 'Add Categories', path: '/admin/sub-categories/add' },
  ],
  products: [
    { id: 'products-list', label: 'Products List', path: '/admin/products' },
    { id: 'add-product', label: 'Add Product', path: '/admin/products/new' },
    { id: 'product-reviews', label: 'Product Reviews', path: '/admin/products/reviews' },
  ],
  ecommerce: [
    { id: 'warranty', label: 'Warranty', path: '/admin/warranty' },
    { id: 'shipping', label: 'Shipping', path: '/admin/shipping' },
    { id: 'return', label: 'Return', path: '/admin/return-policy' },
    { id: 'offers', label: 'Offers', path: '/admin/offers' },
    { id: 'coupons', label: 'Coupons', path: '/admin/coupons' },
  ],
  orders: [
    { id: 'all-orders', label: 'All Orders', path: '/admin/orders' },
    { id: 'pending-orders', label: 'Pending Orders', path: '/admin/orders?status=pending' },
    { id: 'progress-orders', label: 'Progress Orders', path: '/admin/orders?status=progress' },
    { id: 'delivered-orders', label: 'Delivered Orders', path: '/admin/orders?status=delivered' },
    { id: 'cancelled-orders', label: 'cancelled Orders', path: '/admin/orders?status=cancelled' },
  ],
  blog: [
    { id: 'blog-categories', label: 'Categories', path: '/admin/blog-categories' },
    { id: 'blogs', label: 'Pending Orders', path: '/admin/blogs' },
  ],
  faqs: [
    { id: 'faq-categories', label: 'Categories', path: '/admin/faq-categories' },
    { id: 'faqs', label: 'Pending Orders', path: '/admin/faqs' },
  ],
  manageSite:[
    { id: 'slider', label: 'Slider', path: '/admin/hero-banner' },
    { id: 'testimonials', label: 'Testimonials', path: '/admin/testimonials' },
    { id: 'banner', label: 'Banner', path: '/admin/banner' },
  ]
};
// Ecommerce
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
    label: 'Categories',
    submenu: menuItems.categories,
  },
  {
    id: 'products',
    icon: FaLayerGroup,
    label: 'Products',
    submenu: menuItems.products,
  },

  {
    id: 'orders',
    icon: RiLuggageCartFill,
    label: 'Manage Orders',
    submenu: menuItems.orders,
  },
  {
    id: 'transactions',
    icon: FaRandom,
    label: 'Transactions',
    path: '/admin/transactions',
  },
  {
    id: 'ecommerce',
    icon: RiReceiptFill,
    label: 'Ecommerce',
    submenu: menuItems.ecommerce,
  },
  {
    id: 'blog',
    icon: FaRssSquare,
    label: 'Blog',
    submenu: menuItems.blog,
  },
  {
    id: 'faqs',
    icon: FaQuestionCircle,
    label: 'Faqs',
    submenu: menuItems.faqs,
  },
  {
    id: 'page',
    icon: FaBook,
    label: 'Manages Pages',
    path: '/admin/manage-page',
  },
  {
    id: 'manage-site',
    icon: FaTasks,
    label: 'Manage Site',
    submenu: menuItems.manageSite,
  },
  {
    id: 'customer',
    icon: FaUsers,
    label: 'Customer List',
    path: '/admin/customer-list',
  },
  {
    id: 'cache-clear',
    icon: FaBroom,
    label: 'Cache Clear',
    path: '/admin/cache-clear',
  },
  
];

