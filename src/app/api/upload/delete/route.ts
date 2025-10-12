import { NextRequest, NextResponse } from 'next/server';
import { deleteImage, extractPublicId } from '@/lib/cloudinary';
import { withAuth } from '@/lib/middleware';
import dbConnect from '@/lib/mongodb';
import Package from '@/models/Package';

// POST /api/upload/delete - Delete image from Cloudinary and MongoDB (Protected)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { imageUrl, packageId } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Extract public_id from the Cloudinary URL
    const publicId = extractPublicId(imageUrl);

    if (!publicId) {
      return NextResponse.json(
        { success: false, error: 'Invalid Cloudinary URL' },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    await deleteImage(publicId);

    // If packageId is provided, also remove from MongoDB
    if (packageId) {
      await dbConnect();
      const packageDoc = await Package.findOne({ id: packageId });

      if (!packageDoc) {
        return NextResponse.json(
          { success: false, error: 'Package not found' },
          { status: 404 }
        );
      }

      // Remove the image URL from the images array
      packageDoc.images = packageDoc.images.filter(
        (img: string) => img !== imageUrl
      );
      await packageDoc.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    );
  }
});
