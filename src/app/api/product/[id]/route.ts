import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import ProductModel from '@/models/productModel';
import { deleteImage, uploadImage } from '@/lib/cloudinary';
import mongoose from 'mongoose';
import type { ProductUpdateData } from '@/lib/types/product';

// Helper function to validate ObjectId
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

// Helper function to validate admin role
const isAdmin = (role: string): boolean => role === 'admin';

// Helper function to handle unauthorized requests
const unauthorizedResponse = () =>
    NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

// Helper function to handle invalid ID responses
const invalidIdResponse = () =>
    NextResponse.json({ success: false, message: 'Invalid Product ID' }, { status: 400 });

// Helper function to handle not found responses
const notFoundResponse = () =>
    NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });

// Helper function to handle server errors
const serverErrorResponse = (error: Error) => {
    console.error('Error:', error.message);
    return NextResponse.json(
        { success: false, message: 'Internal Server Error', error: error.message },
        { status: 500 }
    );
};

// GET: Fetch a product by ID
export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = await context.params;

        if (!isValidObjectId(id)) return invalidIdResponse();

        const { role } = await getDataFromToken(request);
        if (!isAdmin(role)) return unauthorizedResponse();

        const product = await ProductModel.findById(id);
        if (!product) return notFoundResponse();

        return NextResponse.json({ success: true, data: product }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return serverErrorResponse(error);
        return serverErrorResponse(new Error('Unknown error occurred'));
    }
}

// PUT: Update a product by ID
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        await dbConnect();

        if (!isValidObjectId(id)) return invalidIdResponse();

        const { role } = await getDataFromToken(request);
        if (!isAdmin(role)) return unauthorizedResponse();

        const formData = await request.formData();
        const product = await ProductModel.findById(id);
        if (!product) return notFoundResponse();

        // Parse form data
        const offers = formData.get('offers');
        const offersAsObjectIds = offers
            ? JSON.parse(offers as string).map((id: string) => new mongoose.Types.ObjectId(id))
            : [];

        const tags = formData.get('tags');
        const tagsAsObject = tags ? JSON.parse(tags as string).map((id: string) => id) : [];

        const updatedData: ProductUpdateData = {
            title: formData.get('title')?.toString() || product.title,
            slug: formData.get('slug')?.toString() || product.slug,
            description: formData.get('description')?.toString() || product.description,
            short_description: formData.get('short_description')?.toString() || product.short_description,
            category: formData.get('category')?.toString() || product.category,
            subcategory: formData.get('subcategory')?.toString() || product.subcategory,
            price: parseFloat(formData.get('price')?.toString() || product.price.toString()),
            discountType: formData.get('discountType')?.toString() || product.discountType,
            discountPrice: parseFloat(formData.get('discountPrice')?.toString() || product.discountPrice.toString()),
            rating: parseInt(formData.get('rating')?.toString() || product.rating.toString()),
            stock: parseInt(formData.get('stock')?.toString() || product.stock.toString()),
            tags: tagsAsObject || product.tags,
            sku: formData.get('sku')?.toString() || product.sku,
            weight: parseFloat(formData.get('weight')?.toString() || product.weight.toString()),
            availabilityStatus: formData.get('availabilityStatus')?.toString() || product.availabilityStatus,
            dimensions: formData.get('dimensions')?.toString() || product.dimensions,
            warrantyInformation: formData.get('warrantyInformation')?.toString() || product.warrantyInformation,
            shippingInformation: formData.get('shippingInformation')?.toString() || product.shippingInformation,
            returnPolicy: formData.get('returnPolicy')?.toString() || product.returnPolicy,
            demoVideo: formData.get('demoVideo') || product.demoVideo,
            imgAlt: formData.get('imgAlt')?.toString() || product.imgAlt,
            status: formData.get('status') || product.status,
            ishome: formData.get('ishome') || product.ishome,
            trending: formData.get('trending') || product.trending,
            hot: formData.get('hot') || product.hot,
            sale: formData.get('sale') || product.sale,
            new: formData.get('new') || product.new,
            isCustomize: formData.get('isCustomize') || product.isCustomize,
            customizeLink: formData.get('customizeLink') || product.customizeLink,
            meta: {
                meta_title: formData.get('meta_title')?.toString() || product.meta.meta_title,
                meta_keywords: formData.get('meta_keywords')?.toString() || product.meta.meta_keywords,
                meta_description: formData.get('meta_description')?.toString() || product.meta.meta_description,
            },
            shippingFee: parseFloat(formData.get('shippingFee')?.toString() || product.shippingFee.toString()),
            offers: offersAsObjectIds || product.offers,
            isVarientStatus: formData.get('isVarientStatus') || product.isVarientStatus,
            varient: JSON.parse(formData.get('varient')?.toString() || JSON.stringify(product.varient)),
        };

        // Handle thumbnail upload
        const thumbnail = formData.get('thumbnail');
        if (typeof File !== 'undefined' && thumbnail instanceof File) {
            if (product.thumbnail?.public_id) await deleteImage(product.thumbnail.public_id);
            updatedData.thumbnail = await uploadImage(thumbnail, 'products/thumbnails', 800, 800);
        }

        // Handle images upload
        const imagesRaw = formData.getAll('images');
        if (imagesRaw.length && typeof File !== 'undefined') {
            const uploadedImages = await Promise.all(
                imagesRaw.map(async (image) => {
                    if (typeof File !== 'undefined' && image instanceof File) return uploadImage(image, 'products', 800, 800);
                    throw new Error('Invalid image file provided.');
                })
            );
            updatedData.images = [...(product.images || []), ...uploadedImages];
        }

        // Update and save product
        Object.assign(product, updatedData);
        const savedProduct = await product.save();

        return NextResponse.json(
            { success: true, message: 'Product updated successfully', data: savedProduct },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) return serverErrorResponse(error);
        return serverErrorResponse(new Error('Unknown error occurred'));
    }
}

// DELETE: Delete a product by ID
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        await dbConnect();

        if (!isValidObjectId(id)) return invalidIdResponse();

        const { role } = await getDataFromToken(request);
        if (!isAdmin(role)) return unauthorizedResponse();

        const product = await ProductModel.findById(id);
        if (!product) return notFoundResponse();

        // Delete images from Cloudinary
        const deletePromises = product.images.map((image) => deleteImage(image.public_id));
        if (product.thumbnail?.public_id) deletePromises.push(deleteImage(product.thumbnail.public_id));
        await Promise.all(deletePromises);

        // Delete product from database
        await ProductModel.findByIdAndDelete(id);

        return NextResponse.json(
            { success: true, message: 'Product deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) return serverErrorResponse(error);
        return serverErrorResponse(new Error('Unknown error occurred'));
    }
}

// PATCH: Update product status
export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        await dbConnect();

        if (!isValidObjectId(id)) return invalidIdResponse();

        const { role } = await getDataFromToken(request);
        if (!isAdmin(role)) return unauthorizedResponse();

        const { status } = await request.json();
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedProduct) return notFoundResponse();

        return NextResponse.json(
            { success: true, message: 'Product status updated successfully', data: updatedProduct },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) return serverErrorResponse(error);
        return serverErrorResponse(new Error('Unknown error occurred'));
    }
}