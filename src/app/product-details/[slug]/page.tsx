"use client"
import { get_product_by_slug } from '@/_services/admin/product';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Product } from '@/lib/types';
import ProductDetails from '@/pages/ProductDetails'
import Head from 'next/head';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';



const ProductDetailsPage = () => {

  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true)
  const router = useRouter();


  const fetchProducts = async (slug: string) => {
    try {
      const response = await get_product_by_slug(slug);
      setProduct(response);
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProducts(slug)
  }, [slug])



  if (loading) return <LoadingSpinner />

  if (!product) {
    router.push('/404');
    return null;
  }
  return (


    <>
      {/* Set Meta Tags */}
      <Head>
        <title>{product.title} - Print Hutt</title>
        <meta name="description" content={product.meta?.meta_description || 'We are India No.1 neon light makers. We make customised neon lights and signs for your home, business or events. If you’re looking for a high-quality, custom neon sign maker, contact us at Neon Attack.'} />
        <meta name="keywords" content={product.meta?.keywords || 'Print Hutt,neon'} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.meta?.meta_description} />
        <meta property="og:image" content={product.thumbnail.url} />
        <meta property="og:type" content="product" />
      </Head>

      {/* Product Details */}
      <ProductDetails product={product} />
    </>
  );

}

export default ProductDetailsPage