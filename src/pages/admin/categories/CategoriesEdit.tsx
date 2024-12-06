"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { get_category_by_id } from '@/_services/admin/category';
import { Category } from '@/lib/types';

const CategoriesEdit = () => {
    const params = useParams();
    const id = params?.id as string | undefined;

    if (!id) {
        return <div>Error: No category ID found</div>;
    }


    const [category, setCategory] = useState<Category[]>([]);

    useEffect(() => {

        const getData = async () => {
            const data = await get_category_by_id(id);
            console.log(data)
            // setCategory(data)
        }

        getData()

    }, []);

    return (
        <>
            rfgsdfg
        </>
    )
}

export default CategoriesEdit