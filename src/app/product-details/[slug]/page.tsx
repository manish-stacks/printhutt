"use client"
import ProductDetails from '@/pages/ProductDetails'
import { useParams } from 'next/navigation';

// export const metadata = {
//   title: 'Product-details',
//   description: 'Product-details',
// }

const ProductDetailsPage = () => {

  const params = useParams();
  const slug = params?.slug as string | undefined;
  console.log(slug)

  return <ProductDetails />
}

export default ProductDetailsPage