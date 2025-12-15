import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Package from '../../../models/Package';
import { v4 as uuidv4 } from 'uuid';
import { withAuth } from '../../../lib/middleware';

// GET /api/packages - Fetch all packages
export async function GET() {
  try {
    await dbConnect();
    const packages = await Package.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}

// POST /api/packages - Create a new package (Protected)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    await dbConnect();
    const body = await request.json();
    
    const packageData = {
      ...body,
      id: uuidv4(),
      registrations: [],
    };

    const newPackage = new Package(packageData);
    await newPackage.save();

    return NextResponse.json(
      { success: true, data: newPackage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create package' },
      { status: 500 }
    );
  }
});