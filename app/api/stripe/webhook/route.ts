import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    // Your Stripe logic here...

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
