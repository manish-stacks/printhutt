
import { categoryService } from '@/_services/common/categoryService';
import SubCategory from '@/pages/SubCategory';
import { Metadata } from 'next';
import React from 'react'

interface Props {
    params: {
        subslug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { subslug } = await params
    try {
        const category = await categoryService.getSubCategory(subslug)
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
            title: 'Sub Category',
            description: 'Sub Category information',
        };
    }


}
export default async function SubCategoryPage({ params }: Props) {
    const { subslug } = await params;
    return (
        <SubCategory subslug={subslug} /> 
    )
}

