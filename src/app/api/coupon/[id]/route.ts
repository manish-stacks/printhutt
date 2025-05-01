import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Coupon from '@/models/couponModel';
import mongoose from 'mongoose';


const checkAdminRole = async (request: NextRequest) => {
    const { role } = await getDataFromToken(request);
    if (role !== 'admin') {
        throw new Error('Unauthorized');
    }
};

const validateObjectId = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid Product ID');
    }
};

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = context.params;

        // Validate ObjectId and Admin role
        validateObjectId(id);
        await checkAdminRole(request);

        const coupon = await Coupon.findById(id);
        if (!coupon) {
            return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
        }

        return NextResponse.json(coupon);
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Failed to fetch coupon" },
            { status: error.message === 'Unauthorized' ? 401 : 500 }
        );
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = context.params;

        // Validate ObjectId and Admin role
        validateObjectId(id);
        await checkAdminRole(request);

        const {
            code,
            description,
            discountType,
            discountValue,
            minimumPurchaseAmount,
            maxDiscountAmount,
            validFrom,
            validUntil,
            usageLimit,
            isActive,
            isShow,
        } = await request.json();

        const existingCoupon = await Coupon.findById(id);
        if (!existingCoupon) {
            return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
        }

        // Update coupon fields with new values, preserving existing values if not provided
        existingCoupon.code = code || existingCoupon.code;
        existingCoupon.description = description || existingCoupon.description;
        existingCoupon.discountType = discountType || existingCoupon.discountType;
        existingCoupon.discountValue = discountValue || existingCoupon.discountValue;
        existingCoupon.minimumPurchaseAmount = minimumPurchaseAmount || existingCoupon.minimumPurchaseAmount;
        existingCoupon.maxDiscountAmount = maxDiscountAmount || existingCoupon.maxDiscountAmount;
        existingCoupon.validFrom = validFrom || existingCoupon.validFrom;
        existingCoupon.validUntil = validUntil || existingCoupon.validUntil;
        existingCoupon.usageLimit = usageLimit || existingCoupon.usageLimit;
        existingCoupon.isActive = isActive !== undefined ? isActive : existingCoupon.isActive;
        existingCoupon.isShow = isShow !== undefined ? isShow : existingCoupon.isShow;

        await existingCoupon.save();

        return NextResponse.json({
            success: true,
            message: 'Coupon updated successfully',
            data: existingCoupon,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || 'Failed to update coupon' },
            { status: error.message === 'Unauthorized' ? 401 : 500 }
        );
    }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = context.params;

        // Validate ObjectId and Admin role
        validateObjectId(id);
        await checkAdminRole(request);

        const deleteData = await Coupon.findByIdAndDelete(id);
        if (!deleteData) {
            return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Coupon deleted successfully!",
        });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || 'Failed to delete coupon' },
            { status: error.message === 'Unauthorized' ? 401 : 500 }
        );
    }
}
