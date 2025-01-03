import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import mongoose from 'mongoose';
import { Address } from '@/models/addressModel';

connect()



export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const tokendata = await getDataFromToken(request)
        if (!tokendata.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }



        const existing = await Address.findById(id);

        if (!existing) {
            return NextResponse.json({ success: false, message: "Address not found" }, {
                status
                    : 404
            });
        }

        const validatedData = await request.json();
        const updatedAddress = await Address.findByIdAndUpdate(id, validatedData, { new: true });

        return NextResponse.json(
            {
                success: true,
                message: 'Shipping updated successfully',
                data: updatedAddress,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: " Error updating shipping information" },
            { status: 500 }
        );
    }
}


export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const tokendata = await getDataFromToken(request)
        if (!tokendata.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const deleteData = await Address.findByIdAndDelete(id);
        if (!deleteData) {
            return NextResponse.json({ success: false, message: "Address not found" }, {
                status
                    : 404
            });
        }
        return NextResponse.json({ success: true, message: 'Address deleted successfully' }, {
            status
                : 200
        });


    } catch {
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}


