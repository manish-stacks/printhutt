import Products from '@/pages/Products'


export const metadata = {
  title: 'Product',
  description: 'Products-Page',
  keywords: ['Products', 'neon Products', 'led lights', 'neon lights'],
  openGraph: {
    title: 'Products  ',
    description: 'Products-page',
  },
}
const ProductPage = () => {
  return <Products />
}

export default ProductPage


