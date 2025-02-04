import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { addressSchema } from '@/lib/types/address';
import { ZodError } from 'zod';
import { Address } from '@/models/addressModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';

export async function GET(request: NextRequest) {
    try {
        await dbConnect(); 

        const { id } = await getDataFromToken(request);
        if (!id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const address = await Address.find({ userId: id });

        return NextResponse.json({ success: true, addresses: address }, { status: 200 });
    } catch (error) {
        console.error("Error in GET /address:", error); 
        return NextResponse.json({ message: 'Error fetching addresses' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect(); // ✅ Moved inside function

        const { id } = await getDataFromToken(request);
        if (!id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const validatedData = addressSchema.parse(body);

        const addressCount = await Address.countDocuments({ userId: id });
        const isDefault = addressCount === 0; 

        const address = new Address({
            userId: id,
            fullName: validatedData.fullName,
            mobileNumber: validatedData.mobileNumber,
            addressLine: validatedData.addressLine,
            city: validatedData.city,
            state: validatedData.state,
            postCode: validatedData.postCode,
            addressType: validatedData.addressType,
            alternatePhone: validatedData.alternatePhone,
            isDefault: isDefault
        });

        await address.save();

        return NextResponse.json({
            success: true,
            message: 'Address saved successfully',
            address
        }, { status: 201 });

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }

        console.error("Error in POST /address:", error); 
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
