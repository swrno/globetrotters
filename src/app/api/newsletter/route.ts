import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, source = 'footer' } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { success: false, error: 'Email is already subscribed to our newsletter' },
          { status: 409 }
        );
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = new Date();
        existingSubscriber.source = source;
        await existingSubscriber.save();
        
        return NextResponse.json({
          success: true,
          message: 'Successfully resubscribed to newsletter'
        });
      }
    }
    
    // Create new subscription
    const newSubscriber = new Newsletter({
      email,
      source
    });
    
    await newSubscriber.save();
    
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
    
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Email is already subscribed' },
        { status: 409 }
      );
    }
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    const subscribers = await Newsletter.find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('email subscribedAt source');
    
    const total = await Newsletter.countDocuments({ isActive: true });
    
    return NextResponse.json({
      success: true,
      data: {
        subscribers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
    
  } catch (error) {
    console.error('Newsletter fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch newsletter subscribers' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }
    
    const subscriber = await Newsletter.findOne({ email });
    
    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Email not found in newsletter' },
        { status: 404 }
      );
    }
    
    subscriber.isActive = false;
    await subscriber.save();
    
    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
    
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    );
  }
}