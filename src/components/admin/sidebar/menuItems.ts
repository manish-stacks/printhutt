import { FaBook, FaBroom, FaHome, FaLayerGroup, FaQuestionCircle, FaRandom, FaRssSquare, FaSignOutAlt, FaTag, FaTasks, FaUsers } from "react-icons/fa";
import { RiLuggageCartFill, RiReceiptFill } from "react-icons/ri";


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
  ecommerce: [
    { id: 'warranty', label: 'Warranty', path: '/admin/warranty' },
    { id: 'shipping', label: 'Shipping', path: '/admin/shipping' },
    { id: 'return', label: 'Return', path: '/admin/return' },
    { id: 'offers', label: 'Offers', path: '/admin/offers' },
    { id: 'coupons', label: 'Coupons', path: '/admin/coupons' },
  ],
  orders: [
    { id: 'all-orders', label: 'All Orders', path: '/admin/all-orders' },
    { id: 'pending-orders', label: 'Pending Orders', path: '/admin/pending-orders' },
    { id: 'progress-orders', label: 'Progress Orders', path: '/admin/progress-orders' },
    { id: 'delivered-orders', label: 'Delivered Orders', path: '/admin/delivered-orders' },
    { id: 'canceld-orders', label: 'Canceled Orders', path: '/admin/canceld-orders' },
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
  {
    id: 'log-out',
    icon: FaSignOutAlt,
    label: 'log-out',
    path: '/admin/log-out',
  },
];

