import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import CustomizedPackage from "../../../models/CustomizedPackage";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const { 
      packageId, 
      userEmail, 
      userName, 
      userPhone, 
      selectedInclusions, 
      customDays, 
      customNights, 
      customRequests,
      priceSnapshot 
    } = body;

    if (!packageId || !userEmail || !userName || !userPhone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const customization = new CustomizedPackage({
      packageId,
      userEmail,
      userName,
      userPhone,
      selectedInclusions,
      customDays,
      customNights,
      customRequests,
      priceSnapshot,
      status: 'pending'
    });

    await customization.save();

    return NextResponse.json(
      { success: true, data: customization },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving customization:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save customization" },
      { status: 500 }
    );
  }
}
