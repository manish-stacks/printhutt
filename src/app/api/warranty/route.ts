import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import WarrantyInformation from '@/models/warrantyInformationModel';



export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { role } = await getDataFromToken(req);
    if (role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { warrantyType, durationMonths, coverage, claimProcess } = await req.json();

    // Validate input data if necessary (e.g., check for required fields)
    if (!warrantyType || !durationMonths || !coverage || !claimProcess) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    const warranty = new WarrantyInformation({
      warrantyType,
      durationMonths,
      coverage,
      claimProcess,
    });

    await warranty.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Data inserted successfully',
        data: warranty
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error creating warranty information:', error); // Log the error for debugging
    return NextResponse.json({ error: (error as Error).message || 'Internal Server Error' }, { status: 500 });
  }
}

// GET request to fetch warranty information with pagination
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const page = Math.max(parseInt(url.searchParams.get('page') || '1'), 1);  // Ensure page >= 1
    const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '10'), 1), 100); // Ensure 1 <= limit <= 100
    const search = url.searchParams.get('search') || '';

    const query = search
      ? { warrantyType: { $regex: search, $options: 'i' } }
      : {};

    const skip = (page - 1) * limit;

    const [warranty, total] = await Promise.all([
      WarrantyInformation.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      WarrantyInformation.countDocuments(query)
    ]);

    return NextResponse.json({
      warranty,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error: unknown) {
    console.error('Error fetching warranty information:', error); // Log the error for debugging
    return NextResponse.json({ error: (error as Error).message || 'Failed to fetch data' }, { status: 500 });
  }
}
