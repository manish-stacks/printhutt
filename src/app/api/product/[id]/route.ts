import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import ProductModel from '@/models/productModel';
import { deleteImage, uploadImage } from '@/lib/cloudinary';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

connect()

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


        const product = await ProductModel.findById(params.id);
        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
console.log(formData)
        // Fetch existing product
        const product = await ProductModel.findById(params.id);
        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        // Parse and update product fields
        const updatedData = {
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
            tags: formData.get('tags')?.toString() || product.tags,
            sku: formData.get('sku')?.toString() || product.sku,
            weight: parseFloat(formData.get('weight')?.toString() || product.weight),
            availabilityStatus: formData.get('availabilityStatus')?.toString() || product.availabilityStatus,
            dimensions: formData.get('dimensions')?.toString() || product.dimensions,
            warrantyInformation: formData.get('warrantyInformation')?.toString() || product.warrantyInformation,
            shippingInformation: formData.get('shippingInformation')?.toString() || product.shippingInformation,
            returnPolicy: formData.get('returnPolicy')?.toString() || product.returnPolicy,
            demoVideo: formData.get('demoVideo')?.toString() || product.demoVideo,
            imgAlt: formData.get('imgAlt')?.toString() || product.imgAlt,
            status: formData.get('status') === 'true' || product.status,
            ishome: formData.get('ishome') === 'true' || product.ishome,
            trending: formData.get('trending') === 'true' || product.trending,
            hot: formData.get('hot') === 'true' || product.hot,
            sale: formData.get('sale') === 'true' || product.sale,
            new: formData.get('new') === 'true' || product.new,
            isCustomize: formData.get('isCustomize') === 'true' || product.isCustomize,
            meta: {
                keywords: formData.get('keywords')?.toString() || product.meta.keywords,
                meta_description: formData.get('meta_description')?.toString() || product.meta.meta_description,
            },
            shippingFee: parseFloat(formData.get('shippingFee')?.toString() || product.shippingFee),
            // offers: formData.getAll('offers').map((offer) => offer.toString()) || product.offers,
            offers: formData.getAll('offers').map((offer) => {
                try {
                    return new ObjectId(offer.toString()); // Convert to ObjectId
                } catch {
                    throw new Error(`Invalid ObjectId: ${offer}`);
                }
            }) || product.offers,
            isVarientStatus: formData.get('isVarientStatus') === 'true' || product.isVarientStatus,
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

        // Update product in database
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


export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {

        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const product = await ProductModel.findById(params.id);

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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { status } = await request.json();

        const updatedCategory = await ProductModel.findByIdAndUpdate(
            params.id,
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

