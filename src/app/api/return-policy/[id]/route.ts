import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import ReturnPolicy from '@/models/returnPolicyModule';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import mongoose from 'mongoose';



const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

const isAdmin = (role: string): boolean => role === 'admin';

const unauthorizedResponse = () =>
    NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

const invalidIdResponse = () =>
    NextResponse.json({ success: false, message: 'Invalid Return Policy ID' }, { status: 400 });

const notFoundResponse = () =>
    NextResponse.json({ success: false, message: 'Return Policy not found' }, { status: 404 });

const serverErrorResponse = (error: Error) => {
    console.error('Error:', error.message);
    return NextResponse.json(
        { success: false, message: 'Internal Server Error', error: error.message },
        { status: 500 }
    );
};

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        await dbConnect();
        if (!isValidObjectId(id)) return invalidIdResponse();

        const { role } = await getDataFromToken(request);
        if (!isAdmin(role)) return unauthorizedResponse();

        const returnPolicy = await ReturnPolicy.findById(id).exec();

        if (!returnPolicy) return notFoundResponse();

        return NextResponse.json(returnPolicy, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return serverErrorResponse(error);
        return serverErrorResponse(new Error('Unknown error occurred'));
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        await dbConnect();
        if (!isValidObjectId(id)) return invalidIdResponse();

        const { role } = await getDataFromToken(request);
        if (!isAdmin(role)) return unauthorizedResponse();

        const { returnPeriod, restockingFee, policyDetails } = await request.json();

        const existingPolicy = await ReturnPolicy.findById(id).exec();
        if (!existingPolicy) return notFoundResponse();

        existingPolicy.returnPeriod = returnPeriod || existingPolicy.returnPeriod;
        existingPolicy.restockingFee = restockingFee || existingPolicy.restockingFee;
        existingPolicy.policyDetails = policyDetails || existingPolicy.policyDetails;

        await existingPolicy.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Return Policy updated successfully',
                data: existingPolicy,
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) return serverErrorResponse(error);
        return serverErrorResponse(new Error('Unknown error occurred'));
    }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        await dbConnect();
        if (!isValidObjectId(id)) return invalidIdResponse();

        const { role } = await getDataFromToken(request);
        if (!isAdmin(role)) return unauthorizedResponse();

        const deletedPolicy = await ReturnPolicy.findByIdAndDelete(id).exec();

        if (!deletedPolicy) return notFoundResponse();

        return NextResponse.json(
            {
                success: true,
                message: 'Return Policy deleted successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) return serverErrorResponse(error);
        return serverErrorResponse(new Error('Unknown error occurred'));
    }
}