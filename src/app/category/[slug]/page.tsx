
import { categoryService } from '@/_services/common/categoryService';
import Category from '@/pages/Category';
import { Metadata } from 'next';
import React from 'react'

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    try {
        const category = await categoryService.getCategory(slug)
        // console.log(category)
        return {
            title: category?.metaTitle || 'Product Details',
            description: category?.metaDescription || '',
            keywords: category?.metaKeywords || '',
            openGraph: {
                images: category.image?.url ? [category.image.url] : [],
            },
        };
    } catch (error) {
        return {
            title: 'Category',
            description: 'Category information',
        };
    }


}
export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    return (
        <Category slug={slug} />
    )
}

