import { NextRequest, NextResponse } from 'next/server';
import  dbConnect  from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { uploadImage } from '@/lib/cloudinary';
import ProductModel from '@/models/productModel';
import mongoose from 'mongoose';
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';


export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';
    const query = search ? { title: { $regex: search, $options: 'i' } } : {};
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      ProductModel.find(query)
        .populate({ path: 'category', model: Category })
        .populate({ path: 'subcategory', model: SubCategory })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ProductModel.countDocuments(query)
    ]);

    return NextResponse.json({
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { role } = await getDataFromToken(req);
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    const imagesRaw = formData.getAll('images');
    const thumbnail = formData.get('thumbnail');
    if (!thumbnail || !(thumbnail instanceof File)) {
      return NextResponse.json({ success: false, message: 'Thumbnail is required and must be a file' }, { status: 400 });
    }

    const offers = formData.get('offers');
    const offersAsObjectIds = offers ? JSON.parse(offers as string).map((id: string) => new mongoose.Types.ObjectId(id)) : [];
    const tags = formData.get('tags');
    const tagsAsObject = tags ? JSON.parse(tags as string).map((id: string) => id) : [];

    const productData = {
      title: formData.get('title')?.toString() || '',
      slug: formData.get('slug')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      short_description: formData.get('short_description')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      subcategory: formData.get('subcategory')?.toString() || '',
      price: parseFloat(formData.get('price')?.toString() || '0'),
      discountType: formData.get('discountType')?.toString() || 'percentage',
      discountPrice: parseFloat(formData.get('discountPrice')?.toString() || '0'),
      rating: parseInt(formData.get('rating')?.toString() || '0', 10),
      stock: parseInt(formData.get('stock')?.toString() || '0', 10),
      tags: tagsAsObject || '',
      sku: formData.get('sku')?.toString() || '',
      weight: parseFloat(formData.get('weight')?.toString() || '0'),
      availabilityStatus: formData.get('availabilityStatus')?.toString() || 'in_stock',
      dimensions: formData.get('dimensions')?.toString() || '',
      warrantyInformation: formData.get('warrantyInformation')?.toString() || '',
      shippingInformation: formData.get('shippingInformation')?.toString() || '',
      returnPolicy: formData.get('returnPolicy')?.toString() || '',
      demoVideo: formData.get('demoVideo')?.toString() || '',
      imgAlt: formData.get('imgAlt')?.toString() || '',
      status: formData.get('status') === 'true',
      ishome: formData.get('ishome') === 'true',
      trending: formData.get('trending') === 'true',
      hot: formData.get('hot') === 'true',
      sale: formData.get('sale') === 'true',
      new: formData.get('new') === 'true',
      isCustomize: formData.get('isCustomize') === 'true',
      customizeLink: formData.get('customizeLink')?.toString() || '',
      meta: {
        keywords: formData.get('keywords')?.toString() || '',
        meta_description: formData.get('meta_description')?.toString() || '',
      },
      shippingFee: parseFloat(formData.get('shippingFee')?.toString() || '0'),
      offers: offersAsObjectIds || '',
      isVarientStatus: formData.get('isVarientStatus') === 'true',
      varient: JSON.parse(formData.get('varient')?.toString() || '[]'),
    };

    const product = new ProductModel(productData);
    const savedProduct = await product.save();
    if (savedProduct) {
      const uploadedImages = await Promise.all(
        imagesRaw.map(async (image) => {
          if (image instanceof File) {
            return uploadImage(image, 'products', 800, 800);
          } else {
            throw new Error('Invalid image file provided.');
          }
        })
      );

      const thumbnailResponse = await uploadImage(thumbnail, 'products/thumbnails', 800, 800);
      product.images = uploadedImages;
      product.thumbnail = thumbnailResponse;
      await product.save();
    }

    return NextResponse.json({ success: true, message: 'Data inserted successfully', data: product }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Product creation error:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

