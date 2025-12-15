import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Contact from '../../../models/Contact';

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { fullName, phone, email, message } = body;

    // Validate required fields
    if (!fullName || !phone || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create new contact submission
    const contactData = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    };

    const newContact = new Contact(contactData);
    await newContact.save();

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.',
        data: {
          id: newContact._id,
          submittedAt: newContact.createdAt
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    );
  }
}

// GET /api/contact - Get all contact submissions (Protected - for admin)
export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}