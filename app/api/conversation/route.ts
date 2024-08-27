import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return new NextResponse("API key not configured", { status: 500 });
    }

    if (!messages || !Array.isArray(messages)) {
      return new NextResponse("Invalid messages format", { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat();
    let response;

    for (const message of messages) {
      if (message.role === "user") {
        response = await chat.sendMessage(message.content);
      }
    }

    const result = response?.response.text() || "No response";

    return NextResponse.json({ content: result });
  } catch (e: any) {
    console.error("[CONVERSATION_ERROR]", e.message || e);
    return new NextResponse("Internal error", { status: 500 });
  }
}
