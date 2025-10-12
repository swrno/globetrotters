import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { withAuth } from '@/lib/middleware';

// POST /api/upload - Upload image to Cloudinary (Protected)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Handle File object
    if (file instanceof File) {
      // Convert file to base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

      // Upload to Cloudinary
      const result = await uploadImage(base64);

      return NextResponse.json({
        success: true,
        data: {
          url: result.url,
          publicId: result.publicId,
        },
      });
    }

    // Handle base64 string directly
    if (typeof file === 'string') {
      const result = await uploadImage(file);

      return NextResponse.json({
        success: true,
        data: {
          url: result.url,
          publicId: result.publicId,
        },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid file format' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    );
  }
});
