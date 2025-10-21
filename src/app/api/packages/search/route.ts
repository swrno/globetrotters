import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Package from '@/models/Package';

// GET /api/packages/search - Search packages by destination/location
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    try {
      await dbConnect();
      
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
    } catch (dbError) {
      // Fallback to mock data when database is not available
      console.log('Database not available, using mock data for search');
      
      const mockPackages = [
        {
          id: '1',
          location: 'Manali',
          title: 'Himalayan Adventure',
          images: ['/manali.png'],
          days: 5,
          nights: 4,
        },
        {
          id: '2',
          location: 'Goa',
          title: 'Beach Paradise',
          images: ['/manali.png'],
          days: 4,
          nights: 3,
        },
        {
          id: '3',
          location: 'Kerala',
          title: 'Backwater Bliss',
          images: ['/manali.png'],
          days: 6,
          nights: 5,
        },
        {
          id: '4',
          location: 'Rajasthan',
          title: 'Royal Heritage',
          images: ['/manali.png'],
          days: 7,
          nights: 6,
        },
        {
          id: '5',
          location: 'Ladakh',
          title: 'High Altitude Adventure',
          images: ['/manali.png'],
          days: 8,
          nights: 7,
        },
      ];

      // Filter mock packages based on search query
      const filteredPackages = mockPackages.filter((pkg) => {
        const searchLower = query.toLowerCase();
        return (
          pkg.location.toLowerCase().includes(searchLower) ||
          pkg.title.toLowerCase().includes(searchLower)
        );
      });

      return NextResponse.json({ success: true, data: filteredPackages });
    }
  } catch (error) {
    console.error('Error searching packages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search packages' },
      { status: 500 }
    );
  }
}
