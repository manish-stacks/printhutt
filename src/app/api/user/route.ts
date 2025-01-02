import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import UserModel from '@/models/userModel'

connect();

export async function GET(request: NextRequest) {
    try {
        
        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    
        const url = new URL(request.url);
        const page = Math.max(parseInt(url.searchParams.get('page') || '1', 10), 1); // Ensure `page` is at least 1
        const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '10', 10), 1), 100); // Limit between 1 and 100
        const search = url.searchParams.get('search') || '';
      
        
        const query: any = { role: { $ne: 'admin' } };
      
        if (search) {
            query.username = { $regex: search, $options: 'i' };
        }

        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            UserModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
                UserModel.countDocuments(query),
        ]);

      
        return NextResponse.json({
            users,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit,
            },
        });
    } catch (error: any) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

