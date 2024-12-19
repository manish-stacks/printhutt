import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import ProductModel from '@/models/productModel';
import { deleteImage, uploadImage } from '@/lib/cloudinary';
import mongoose from 'mongoose';
import { ProductUpdateData } from '@/lib/types';

connect()

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const product = await ProductModel.findById(id);
        if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

        return NextResponse.json(product);

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }


}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }


        const { role } = await getDataFromToken(request);
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });



        const formData = await request.formData();
        console.log(formData)

        const product = await ProductModel.findById(id);
        if (!product) return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });


        const offers = formData.get('offers');
        const offersAsObjectIds = offers ? JSON.parse(offers as string).map((id: string) => new mongoose.Types.ObjectId(id)) : [];

        const tags = formData.get('tags');
        const tagsAsObject = tags ? JSON.parse(tags as string).map((id: string) => id) : [];


        // Parse and update product fields
        const updatedData: ProductUpdateData = {
            title: formData.get('title')?.toString() || product.title,
            slug: formData.get('slug')?.toString() || product.slug,
            description: formData.get('description')?.toString() || product.description,
            category: formData.get('category')?.toString() || product.category,
            subcategory: formData.get('subcategory')?.toString() || product.subcategory,
            price: parseFloat(formData.get('price')?.toString() || product.price),
            discountType: formData.get('discountType')?.toString() || product.discountType,
            discountPrice: parseFloat(formData.get('discountPrice')?.toString() || product.discountPrice),
            rating: parseInt(formData.get('rating')?.toString() || product.rating),
            stock: parseInt(formData.get('stock')?.toString() || product.stock),
            tags: tagsAsObject || product.tags,
            sku: formData.get('sku')?.toString() || product.sku,
            weight: parseFloat(formData.get('weight')?.toString() || product.weight),
            availabilityStatus: formData.get('availabilityStatus')?.toString() || product.availabilityStatus,
            dimensions: formData.get('dimensions')?.toString() || product.dimensions,
            warrantyInformation: formData.get('warrantyInformation')?.toString() || product.warrantyInformation,
            shippingInformation: formData.get('shippingInformation')?.toString() || product.shippingInformation,
            returnPolicy: formData.get('returnPolicy')?.toString() || product.returnPolicy,
            demoVideo: formData.get('demoVideo') || product.demoVideo,
            imgAlt: formData.get('imgAlt')?.toString() || product.imgAlt,
            status: formData.get('status')  || product.status,
            ishome: formData.get('ishome')  || product.ishome,
            trending: formData.get('trending')  || product.trending,
            hot: formData.get('hot')  || product.hot,
            sale: formData.get('sale')  || product.sale,
            new: formData.get('new')  || product.new,
            isCustomize: formData.get('isCustomize')  || product.isCustomize,
            meta: {
                keywords: formData.get('keywords')?.toString() || product.meta.keywords,
                meta_description: formData.get('meta_description')?.toString() || product.meta.meta_description,
            },
            shippingFee: parseFloat(formData.get('shippingFee')?.toString() || product.shippingFee),
            offers: offersAsObjectIds || product.offers,
            isVarientStatus: formData.get('isVarientStatus')  || product.isVarientStatus,
            varient: JSON.parse(formData.get('varient')?.toString() || JSON.stringify(product.varient)),
        };

        // Handle thumbnail upload
        const thumbnail = formData.get('thumbnail');
        if (thumbnail instanceof File) {
            if (product.thumbnail?.public_id) {
                await deleteImage(product.thumbnail.public_id);
            }
            updatedData.thumbnail = await uploadImage(thumbnail, 'products/thumbnails');
        }

        // Handle images upload
        const imagesRaw = formData.getAll('images');
        if (imagesRaw.length) {
            const uploadedImages = await Promise.all(
                imagesRaw.map(async (image) => {
                    if (image instanceof File) {
                        return uploadImage(image, 'products');
                    } else {
                        throw new Error('Invalid image file provided.');
                    }
                })
            );
            updatedData.images = [...(product.images || []), ...uploadedImages];
        }

        Object.assign(product, updatedData);
        const savedProduct = await product.save();

        return NextResponse.json(
            { success: true, message: 'Product updated successfully', data: savedProduct },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error updating product:', error.message);
        return NextResponse.json({ success: false, message: 'Failed to update product', error: error.message }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }
        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const product = await ProductModel.findById(id);

        if (!product) {
            return NextResponse.json({ error: "Return not found" }, { status: 404 });
        }

        const images = product.images

        for (const image of images) {
            await deleteImage(image.public_id);
        }

        await deleteImage(product.thumbnail.public_id);

        await product.delete();

        return NextResponse.json({
            success: true,
            message: "Deleted successfully!",
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }
        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { status } = await request.json();

        const updatedCategory = await ProductModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedCategory) {
            return NextResponse.json(
                { success: false, message: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Successfully updated product"
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

