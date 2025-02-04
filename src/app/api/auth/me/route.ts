import dbConnect from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/userModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';

await dbConnect();  // Use dbConnect() here

export const POST = async (request: NextRequest) => {
    try {
        const { id } = await getDataFromToken(request);
        if (!id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const user = await UserModel.findOne({ _id: id });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: "User Found",
            success: true,
            user: user,
        }, { status: 200 });
    } catch (error: unknown) {
        console.error('Error:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Internal server error',
        }, { status: 500 });
    }
};
