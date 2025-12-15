import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import dbConnect from '../../../lib/mongodb';
import Package from '../../../models/Package';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { messages } = await req.json();

    // Fetch all packages to provide context
    const packages = await Package.find({}).select('id title location description cost_per_person days nights category best_time_to_visit images');

    const packageContext = packages.map(pkg => 
      `- ID: ${pkg.id}. ${pkg.title} (${pkg.location}): ${pkg.days} days, ${pkg.nights} nights. Cost: ${pkg.cost_per_person}. Best time: ${pkg.best_time_to_visit}. Category: ${pkg.category}. Images: ${pkg.images?.join(', ')}`
    ).join('\n');

    const systemPrompt = `You are a helpful travel assistant for Globetrotters. 
    The support contact number is **+91 96740 25615**.
    You have access to the following travel packages:
    ${packageContext}
    
    Answer user questions based on this information. Be polite and concise. 
    ALWAYS use Markdown for your responses. Use headings, lists, bold text, and tables where appropriate to make the response visually appealing and easy to read.
    If you want to show an image of a package, use the markdown format: ![Image Description](image_url). 
    Only use images provided in the package details.
    
    RESPONSE FORMAT:
    You must ALWAYS return a JSON object with the following structure. Do not output any text outside this JSON object.
    {
      "response": "Your response content in Markdown",
      "suggestions": ["Predictive Question 1", "Predictive Question 2", "Predictive Question 3"], // Generate 3 short, predictive follow-up questions that the user is likely to ask next based on the current context. These should be phrased as if the user is asking them (e.g., 'What is the cost?', 'Show me images', 'How do I book?').
      "booking": { // Optional, ONLY include if user provided ALL details (Name, Email, Phone) for booking
        "packageId": "PACKAGE_ID",
        "name": "User Name",
        "email": "User Email",
        "phone": "User Phone"
      }
    }

    Booking Rules:
    1. If a user wants to book, ask for **Full Name**, **Email Address**, and **Phone Number**.
    2. **VALIDATION**:
       - **Name**: Must be a full name (at least two words). Reject single names like "John".
       - **Email**: Must appear to be a valid email address. Reject inputs like "no", "test", or invalid formats.
       - **Phone**: Must be a valid phone number (at least 10 digits). Reject short numbers.
       - If any input is invalid, politely ask the user to correct it.
    3. Do NOT include the "booking" object until you have ALL three VALID details.
    4. If details are missing or invalid, ask for them in the "response" field.
    4. ONLY include the "booking" object ONCE when you first collect all details. If the user continues the conversation after booking, do NOT include the "booking" object again.
    
    If a user asks about something not in the list or if you don't have the information, politely apologize and suggest they contact support at **+91 96740 25615**.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
      response_format: { type: "json_object" } // Force JSON mode if supported, otherwise prompt handles it
    });

    const rawContent = chatCompletion.choices[0]?.message?.content || "{}";
    let parsedData: any = { response: "I'm sorry, I couldn't generate a response.", suggestions: [] };

    try {
      parsedData = JSON.parse(rawContent);
    } catch (e) {
      console.error("Failed to parse LLM response:", e);
      // Fallback: try to find JSON block if strict JSON failed
      const jsonMatch = rawContent.match(/```json\n([\s\S]*?)\n```/) || rawContent.match(/{[\s\S]*}/);
      if (jsonMatch) {
        try {
          parsedData = JSON.parse(jsonMatch[1] || jsonMatch[0]);
        } catch (e2) {
          parsedData = { response: rawContent, suggestions: [] };
        }
      } else {
         parsedData = { response: rawContent, suggestions: [] };
      }
    }

    // Handle Booking
    if (parsedData.booking) {
      const { packageId, name, email, phone } = parsedData.booking;
      
      // Perform registration
      const packageDoc = await Package.findOne({ id: packageId });
      if (packageDoc) {
        const existingRegistration = packageDoc.registrations.find(
          (reg: any) => reg.email === email
        );

        if (existingRegistration) {
          parsedData.response = `I see you are already registered for the **${packageDoc.title}**. Is there anything else I can help you with?`;
        } else {
          packageDoc.registrations.push({
            name,
            email,
            phone,
            registeredAt: new Date(),
          });
          await packageDoc.save();
          parsedData.response = `Great news, ${name}! I have successfully registered your interest for the **${packageDoc.title}**. We will contact you shortly at ${email} or ${phone}.`;
          parsedData.bookingSuccess = true;
        }
      } else {
        parsedData.response = "I apologize, but I couldn't find the package you requested. Please try again.";
      }
    }

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
