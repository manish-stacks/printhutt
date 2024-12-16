import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { uploadImage } from '@/lib/cloudinary';
import ProductModel from '@/models/productModel';

connect();


export async function POST(req: NextRequest) {
  try {
    const { role } = await getDataFromToken(req);
    if (role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse FormData
    const formData = await req.formData();

    // Retrieve images and thumbnail from FormData
    const imagesRaw = formData.getAll('images'); // Use `getAll` for arrays
    const thumbnail = formData.get('thumbnail');

    if (!thumbnail || !(thumbnail instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'Thumbnail is required and must be a file' },
        { status: 400 }
      );
    }

    // Validate and upload images
    const uploadedImages = await Promise.all(
      imagesRaw.map(async (image) => {
        if (image instanceof File) {
          const uploadResponse = await uploadImage(image, 'products');
          return uploadResponse;
        } else {
          throw new Error('Invalid image file provided.');
        }
      })
    );

    // Upload thumbnail
    const thumbnailResponse = await uploadImage(thumbnail, 'products/thumbnails');

    // Parse and validate product details from FormData
    const productData = {
      title: formData.get('title')?.toString() || '',
      slug: formData.get('slug')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      subcategory: formData.get('subcategory')?.toString() || '',
      price: parseFloat(formData.get('price')?.toString() || '0'),
      discountType: formData.get('discountType')?.toString() || 'percentage',
      discountPrice: parseFloat(formData.get('discountPrice')?.toString() || '0'),
      rating: parseInt(formData.get('rating')?.toString() || '0', 10),
      stock: parseInt(formData.get('stock')?.toString() || '0', 10),
      tags: formData.get('tags')?.toString() || '',
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
      trending: formData.get('tranding') === 'true',
      hot: formData.get('hot') === 'true',
      sale: formData.get('sale') === 'true',
      new: formData.get('new') === 'true',
      isCustomize: formData.get('isCustomize') === 'true',
      images: uploadedImages,
      thumbnail: thumbnailResponse,
      meta: {
        keywords: formData.get('keywords')?.toString() || '',
        meta_description: formData.get('meta_description')?.toString() || '',
      },
      shippingFee: parseFloat(formData.get('shippingFee')?.toString() || '0'),
      offers: formData.getAll('offers').map((offer) => offer.toString()),
      isVarientStatus: formData.get('isVarientStatus') === 'true',
      varient: JSON.parse(formData.get('varient')?.toString() || '[]'),
    };

    // Save product to the database
    const product = new ProductModel(productData);
    const savedProduct = await product.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Data inserted successfully',
        data: savedProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';

    const query = search
      ? { title: { $regex: search, $options: 'i' } }
      : {};

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      ProductModel.find(query)
        .populate('category', 'name')
        .populate('subcategory', 'name')
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


