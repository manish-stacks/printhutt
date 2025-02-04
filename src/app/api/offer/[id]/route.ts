import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Offer from '@/models/offerModel';
import mongoose from 'mongoose';

// Utility function to validate MongoDB ObjectId
const validateObjectId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Offer ID");
  }
};

// Utility function to check if the user is an admin
const checkAdminRole = async (request: NextRequest) => {
  const { role } = await getDataFromToken(request);
  if (role !== 'admin') {
    throw new Error("Unauthorized");
  }
};

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    await dbConnect(); 

    const { id } = context.params;
    validateObjectId(id);
    await checkAdminRole(request);

    const offer = await Offer.findById(id);
    if (!offer) {
      return NextResponse.json({ success: false, message: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: offer }, { status: 200 });
  } catch (error) {
    console.error("Error fetching offer:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch offer" }, { status: error.message === "Unauthorized" ? 401 : 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    await dbConnect(); 

    const { id } = context.params;
    validateObjectId(id);
    await checkAdminRole(request);

    const updateData = await request.json();
    const updatedOffer = await Offer.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedOffer) {
      return NextResponse.json({ success: false, message: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Offer updated successfully", data: updatedOffer }, { status: 200 });
  } catch (error) {
    console.error("Error updating offer:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to update offer" }, { status: error.message === "Unauthorized" ? 401 : 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    await dbConnect(); 

    const { id } = context.params;
    validateObjectId(id);
    await checkAdminRole(request);

    const deletedOffer = await Offer.findByIdAndDelete(id);

    if (!deletedOffer) {
      return NextResponse.json({ success: false, message: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Offer deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting offer:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to delete offer" }, { status: error.message === "Unauthorized" ? 401 : 500 });
  }
}
