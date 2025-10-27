import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Package from '@/models/Package';
import { withAuth } from '@/lib/middleware';
import { extractPublicId, deleteImages } from '@/lib/cloudinary';

// GET /api/packages/[id] - Fetch a single package by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const packageDoc = await Package.findOne({ id });
    
    if (!packageDoc) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: packageDoc });
  } catch (error) {
    console.error('Error fetching package:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch package' },
      { status: 500 }
    );
  }
}

// PUT /api/packages/[id] - Update a package (Protected)
export const PUT = withAuth(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    
    // Remove fields that shouldn't be updated
    const { _id, createdAt, updatedAt, ...updateData } = body;
    
    // Ensure category is always in the update data
    if (!updateData.category) {
      updateData.category = 'domestic'; // Default value
    }
    
    // Use findOneAndUpdate with explicit $set to ensure all fields including category are updated
    const updatedPackage = await Package.findOneAndUpdate(
      { id },
      { 
        $set: {
          ...updateData,
          category: updateData.category // Explicitly ensure category is set
        }
      },
      { 
        new: true, 
        runValidators: true,
        upsert: false
      }
    );

    if (!updatedPackage) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedPackage });
  } catch (error) {
    console.error('Error updating package:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: 'Failed to update package', details: errorMessage },
      { status: 500 }
    );
  }
});

// DELETE /api/packages/[id] - Delete a package (Protected)
export const DELETE = withAuth(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnect();
    const { id } = await params;
    const deletedPackage = await Package.findOneAndDelete({ id });

    if (!deletedPackage) {
      return NextResponse.json(
        { success: false, error: 'Package not found' },
        { status: 404 }
      );
    }

    // Delete all images from Cloudinary if they exist
    if (deletedPackage.images && deletedPackage.images.length > 0) {
      try {
        const publicIds = deletedPackage.images
          .map((url: string) => extractPublicId(url))
          .filter((publicId: string | null): publicId is string => publicId !== null);
        
        if (publicIds.length > 0) {
          await deleteImages(publicIds);
        }
      } catch (error) {
        console.error('Error deleting images from Cloudinary:', error);
        // Continue with package deletion even if image deletion fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Package deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete package' },
      { status: 500 }
    );
  }
});