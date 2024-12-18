import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import ShippingInformation from '@/models/shippingInformationModel';
import mongoose from 'mongoose';

connect()

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
       const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


        const post = await ShippingInformation.findById(id);
        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
       const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }
        const { shippingMethod, shippingFee, shippingTime } = await request.json();

        const existingShipping = await ShippingInformation.findById(id);

        if (!existingShipping) {
            return NextResponse.json(
                { error: 'Shipping not found' },
                { status: 404 }
            );
        }

        existingShipping.shippingMethod = shippingMethod || existingShipping.shippingMethod;
        existingShipping.shippingFee = shippingFee || existingShipping.shippingFee;
        existingShipping.shippingTime = shippingTime || existingShipping.shippingTime;

        await existingShipping.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Shipping updated successfully',
                data: existingShipping,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to update Shipping' },
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

        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const deleteData = await ShippingInformation.findByIdAndDelete(id);

        if (!deleteData) {
            return NextResponse.json({ error: "Warranty not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Warranty Deleted successfully!",
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}


export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    try {
       const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


        const { status } = await request.json();
        const updatedShipping = await ShippingInformation.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedShipping) {
            return NextResponse.json(
                { success: false, message: 'Shipping not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Successfully updated Shipping"
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}