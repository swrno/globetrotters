import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import dbConnect from '../../../lib/mongodb';
import Package from '../../../models/Package';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { messages, bookingData } = await req.json();

    // Handle Direct Booking Submission
    if (bookingData) {
      const { packageId, name, email, phone } = bookingData;
      
      const packageDoc = await Package.findOne({ id: packageId });
      if (packageDoc) {
        const existingRegistration = packageDoc.registrations.find(
          (reg: any) => reg.email === email
        );

        if (existingRegistration) {
          return NextResponse.json({ 
            response: `I see you are already registered for the **${packageDoc.title}**. Is there anything else I can help you with?`,
            bookingSuccess: false
          });
        } else {
          packageDoc.registrations.push({
            name,
            email,
            phone,
            registeredAt: new Date(),
          });
          await packageDoc.save();
          return NextResponse.json({ 
            response: `Great news, ${name}! We have successfully registered your interest for the **${packageDoc.title}**. We will contact you shortly at ${email} or ${phone}.`,
            bookingSuccess: true
          });
        }
      } else {
        return NextResponse.json({ response: "I apologize, but I couldn't find the package you requested. Please try again." });
      }
    }

    // Fetch all packages to provide context
    const packages = await Package.find({}).select('id title location description cost_per_person days nights category best_time_to_visit images');

    const packageContext = packages.map(pkg => 
      `- ID: ${pkg.id}. ${pkg.title} (${pkg.location}): ${pkg.days} days, ${pkg.nights} nights. Cost: ${pkg.cost_per_person}. Best time: ${pkg.best_time_to_visit}. Category: ${pkg.category}. Images: ${pkg.images?.join(', ')}. Link: /package/${pkg.id}`
    ).join('\n');

    const systemPrompt = `You are a helpful travel assistant for Globetrotters. 
    The support contact number is **+91 96740 25615**.
    You have access to the following travel packages:
    ${packageContext}
    
    Answer user questions based on this information. Be polite and concise. 
    ALWAYS use Markdown for your responses. Use headings, lists, bold text, and tables where appropriate to make the response visually appealing and easy to read.
    If you want to show an image of a package, use the markdown format: ![Image Description](image_url). 
    Only use images provided in the package details.
    
    **IMPORTANT**: When discussing a specific package, provide a link to its details page using the format: [View Package Details](Link) ONLY if the user explicitly asks for more details, asks for a link, or if you are providing a comprehensive overview requested by the user. Do not include it in every mention.
    
    RESPONSE FORMAT:
    You must ALWAYS return a JSON object with the following structure. Do not output any text outside this JSON object.
    {
      "response": "Your response content in Markdown",
      "suggestions": ["Predictive Question 1", "Predictive Question 2", "Predictive Question 3"], // Generate 3 short, predictive follow-up questions.
      "showBookingForm": false, // Set to true ONLY if the user explicitly says they want to book a SPECIFIC package.
      "packageId": "PACKAGE_ID" // Required if showBookingForm is true. The ID of the package to book.
    }

    Booking Rules:
    1. If a user says "I want to book [Package Name]" or "Book this", set "showBookingForm": true and provide the correct "packageId".
    2. Do NOT ask for name, email, or phone number in the text response. The form will handle that.
    3. If the user wants to book but hasn't specified a package, ask them which package they would like to book.
    
    If a user asks about something not in the list or if you don't have the information, politely apologize and suggest they contact support at **+91 96740 25615**.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
      response_format: { type: "json_object" }
    });

    const rawContent = chatCompletion.choices[0]?.message?.content || "{}";
    let parsedData: any = { response: "I'm sorry, I couldn't generate a response.", suggestions: [] };

    try {
      parsedData = JSON.parse(rawContent);
    } catch (e) {
      console.error("Failed to parse LLM response:", e);
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

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
