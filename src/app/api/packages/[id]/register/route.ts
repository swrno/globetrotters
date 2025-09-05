import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Package from '@/models/Package';

// POST /api/packages/[id]/register - Register interest in a package
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const { name, email, phone } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Find the package
    const packageDoc = await Package.findOne({ id });
    if (!packageDoc) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }

    // Check if user already registered
    const existingRegistration = packageDoc.registrations.find(
      (reg: any) => reg.email === email
    );

    if (existingRegistration) {
      return NextResponse.json(
        { success: false, error: 'You have already registered for this package' },
        { status: 400 }
      );
    }

    // Add new registration
    const newRegistration = {
      name,
      email,
      phone,
      registeredAt: new Date(),
    };

    packageDoc.registrations.push(newRegistration);
    await packageDoc.save();

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully registered for the package',
        data: newRegistration
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering for package:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to register for package' },
      { status: 500 }
    );
  }
}