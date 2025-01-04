import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Offer from '@/models/offerModel';
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

        const post = await Offer.findById(id);
        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(post);
    } catch {
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
       
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' },{ status: 401 });
        const { offerTitle, offerDescription, discountPercentage, validFrom, validTo } = await request.json();


        const existing = await Offer.findById(id);

        if (!existing) {
            return NextResponse.json(
                { error: 'Offer not found' },
                { status: 404 }
            );
        }

        existing.offerTitle = offerTitle || existing.offerTitle;
        existing.offerDescription = offerDescription || existing.offerDescription;
        existing.discountPercentage = discountPercentage || existing.discountPercentage;
        existing.validFrom = validFrom || existing.validFrom;
        existing.validTo = validTo || existing.validTo;

        await existing.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Offer updated successfully',
                data: existing,
            },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: 'Failed to update' },
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

        const deleteData = await Offer.findByIdAndDelete(id);

        if (!deleteData) {
            return NextResponse.json({ error: "Return not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Return Deleted successfully!",
        });

    } catch {
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}

