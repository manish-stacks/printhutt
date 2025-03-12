import { get_product_by_category_id, get_product_by_slug } from '@/_services/admin/product';
import ProductDetails from '@/pages/ProductDetails';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await get_product_by_slug(slug);

    if (!product) {
      return {
        title: 'Product Details',
        description: 'Product information',
      };
    }

    return {
      title: product?.meta?.meta_title || 'Product Details',
      description: product?.meta?.meta_description || '',
      keywords: product?.meta?.meta_keywords || '',
      openGraph: {
        images: product.thumbnail?.url ? [product.thumbnail.url] : [],
      },
    };
  } catch {
    return {
      title: 'Product Details',
      description: 'Product information',
    };
  }
}

export default async function ProductPage({ params }: Props) {
  try {
    const { slug } = await params;
    const product = await get_product_by_slug(slug);

    if (!product) {
      return notFound();
    }

    const catId = product?.category?._id;
    const product_response = await get_product_by_category_id(catId);
    const relatedProduct = product_response?.products || [];

    return <ProductDetails product={product} relatedProduct={relatedProduct} />;
  } catch {
    return notFound();
  }
}
