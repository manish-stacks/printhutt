import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { addressSchema } from '@/lib/types/address';
import { ZodError } from 'zod';
import { Address } from '@/models/addressModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function GET(request: NextRequest) {
    const { id } = await getDataFromToken(request)

    if (!id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {
        const address = await Address.find({userId:id});
        return NextResponse.json(address, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error fetching addresses' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { id } = await getDataFromToken(request)

        if (!id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const validatedData = addressSchema.parse(body);

        const existingAddress = await Address.findOne({ userId: id });
        const isDefault = existingAddress ? false : true;

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
            isDefault:isDefault
        });

        await address.save()

        return NextResponse.json({
            success: true,
            message: 'Address saved successfully',
            address: address
        });


    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}