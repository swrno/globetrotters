import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Package from '@/models/Package';

// GET /api/packages/search - Search packages by destination/location
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Search in location, title, and tags fields
    const packages = await Package.find({
      $or: [
        { location: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    })
    .select('id location title images days nights')
    .limit(10)
    .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    console.error('Error searching packages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search packages' },
      { status: 500 }
    );
  }
}
