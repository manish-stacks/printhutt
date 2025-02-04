import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import ShippingInformation from '@/models/shippingInformationModel';
import mongoose from 'mongoose';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Shipping ID" }, { status: 400 });
        }
        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        const shippingInfo = await ShippingInformation.findById(id);
        if (!shippingInfo) {
            return NextResponse.json({ success: false, message: "Shipping information not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: shippingInfo }, { status: 200 });
    } catch (error) {
        console.error('Error fetching shipping information:', error);
        return NextResponse.json({ success: false, message: "Failed to fetch shipping information" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Shipping ID" }, { status: 400 });
        }
        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        const { shippingMethod, shippingFee, shippingTime } = await request.json();
        if (!shippingMethod || !shippingFee || !shippingTime) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }
        const updatedShipping = await ShippingInformation.findByIdAndUpdate(
            id,
            { shippingMethod, shippingFee, shippingTime },
            { new: true }
        );
        if (!updatedShipping) {
            return NextResponse.json({ success: false, message: "Shipping information not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedShipping, message: "Shipping information updated successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error updating shipping information:', error);
        return NextResponse.json({ success: false, message: "Failed to update shipping information" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Shipping ID" }, { status: 400 });
        }
        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        const deletedShipping = await ShippingInformation.findByIdAndDelete(id);
        if (!deletedShipping) {
            return NextResponse.json({ success: false, message: "Shipping information not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Shipping information deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error deleting shipping information:', error);
        return NextResponse.json({ success: false, message: "Failed to delete shipping information" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Shipping ID" }, { status: 400 });
        }
        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        const { status } = await request.json();
        if (!status) {
            return NextResponse.json({ success: false, message: "Missing status field" }, { status: 400 });
        }
        const updatedShipping = await ShippingInformation.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!updatedShipping) {
            return NextResponse.json({ success: false, message: "Shipping information not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedShipping, message: "Shipping status updated successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error updating shipping status:', error);
        return NextResponse.json({ success: false, message: "Failed to update shipping status" }, { status: 500 });
    }
}