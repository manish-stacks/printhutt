import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import WarrantyInformation from '@/models/warrantyInformationModel';
import mongoose from 'mongoose';



// Helper function to check admin role
const checkAdminRole = async (request: NextRequest) => {
    const { role } = await getDataFromToken(request);
    if (role !== 'admin') {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
};

// Helper function to validate ObjectId
const validateObjectId = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, message: 'Invalid Product ID' }, { status: 400 });
    }
    return null;
};

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    await dbConnect();
    const { id } = await context.params;

    const validationResponse = validateObjectId(id);
    if (validationResponse) return validationResponse;

    const roleCheckResponse = await checkAdminRole(request);
    if (roleCheckResponse) return roleCheckResponse;

    try {
        const post = await WarrantyInformation.findById(id);
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching warranty:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    await dbConnect();
    const { id } = await context.params;

    const validationResponse = validateObjectId(id);
    if (validationResponse) return validationResponse;

    const roleCheckResponse = await checkAdminRole(request);
    if (roleCheckResponse) return roleCheckResponse;

    try {
        const { warrantyType, durationMonths, coverage, claimProcess } = await request.json();

        const existingWarranty = await WarrantyInformation.findById(id);
        if (!existingWarranty) {
            return NextResponse.json({ error: 'Warranty not found' }, { status: 404 });
        }

        existingWarranty.warrantyType = warrantyType || existingWarranty.warrantyType;
        existingWarranty.durationMonths = durationMonths || existingWarranty.durationMonths;
        existingWarranty.coverage = coverage || existingWarranty.coverage;
        existingWarranty.claimProcess = claimProcess || existingWarranty.claimProcess;

        await existingWarranty.save();

        return NextResponse.json({
            success: true,
            message: 'Warranty updated successfully',
            data: existingWarranty,
        }, { status: 201 });
    } catch (error) {
        console.error('Error updating warranty:', error);
        return NextResponse.json({ error: 'Failed to update Warranty' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    await dbConnect();
    const { id } = await context.params;

    const validationResponse = validateObjectId(id);
    if (validationResponse) return validationResponse;

    const roleCheckResponse = await checkAdminRole(request);
    if (roleCheckResponse) return roleCheckResponse;

    try {
        const deleteData = await WarrantyInformation.findByIdAndDelete(id);

        if (!deleteData) {
            return NextResponse.json({ error: 'Warranty not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Warranty deleted successfully!',
        });
    } catch (error) {
        console.error('Error deleting warranty:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    await dbConnect();
    const { id } = await context.params;

    const validationResponse = validateObjectId(id);
    if (validationResponse) return validationResponse;

    const roleCheckResponse = await checkAdminRole(request);
    if (roleCheckResponse) return roleCheckResponse;

    try {
        const { status } = await request.json();

        const updatedWarranty = await WarrantyInformation.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedWarranty) {
            return NextResponse.json({ success: false, message: 'Warranty not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully updated Warranty',
        }, { status: 200 });
    } catch (error) {
        console.error('Error updating warranty status:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
