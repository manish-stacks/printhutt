import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import ReturnPolicy from '@/models/returnPolicyModule';
import { getDataFromToken } from '@/helpers/getDataFromToken';


connect()

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


        const post = await ReturnPolicy.findById(params.id);
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

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { returnPeriod, restockingFee, policyDetails } = await request.json();


        const existing = await ReturnPolicy.findById(params.id);

        if (!existing) {
            return NextResponse.json(
                { error: 'Policy Details not found' },
                { status: 404 }
            );
        }

        existing.returnPeriod = returnPeriod || existing.returnPeriod;
        existing.restockingFee = restockingFee || existing.restockingFee;
        existing.policyDetails = policyDetails || existing.policyDetails;

        await existing.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Policy Details updated successfully',
                data: existing,
            },
            { status: 201 }
        );
    } catch (error) {
        // console.error(error);
        return NextResponse.json(
            { error: 'Failed to update' },
            { status: 500 }
        );
    }
}


export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {

        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const deleteData = await ReturnPolicy.findByIdAndDelete(params.id);

        if (!deleteData) {
            return NextResponse.json({ error: "Return not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Return Deleted successfully!",
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}

