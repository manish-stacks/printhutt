import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import mongoose from 'mongoose';
import { Address } from '@/models/addressModel';

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect(); 

        const { id } = context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Address ID" }, { status: 400 });
        }

        let tokendata;
        
        try {
            tokendata = await getDataFromToken(request);
            if (!tokendata.id) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
        } catch (error) {
            return NextResponse.json({ success: false, message: error.message || "Invalid Token" }, { status: 401 });
        }

        const existing = await Address.findById(id);
        if (!existing) {
            return NextResponse.json({ success: false, message: "Address not found" }, { status: 404 });
        }

        const validatedData = await request.json();
        const updatedAddress = await Address.findByIdAndUpdate(
            id, 
            { $set: validatedData }, 
            { new: true }
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Shipping address updated successfully',
                data: updatedAddress,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error in PUT /address:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Error updating shipping information" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect(); 

        const { id } = context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Address ID" }, { status: 400 });
        }

        let tokendata;
        try {
            tokendata = await getDataFromToken(request);
            if (!tokendata.id) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
        } catch (error) {
            return NextResponse.json({ success: false, message: error.message || "Invalid Token" }, { status: 401 });
        }

        const deleteData = await Address.findByIdAndDelete(id);
        if (!deleteData) {
            return NextResponse.json({ success: false, message: "Address not found" }, { status: 404 });
        }

        return NextResponse.json(
            { success: true, message: 'Address deleted successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error in DELETE /address:", error); 
        return NextResponse.json(
            { success: false, message: "Failed to delete address" },
            { status: 500 }
        );
    }
}
