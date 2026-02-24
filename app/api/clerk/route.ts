import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing CLERK_WEBHOOK_SECRET in .env");
    return new Response("Error occured -- missing secret", { status: 500 });
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Missing svix headers");
    return new Response("Error occured -- no svix headers", { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new Response("Error occured", { status: 400 });
  }

  console.log(`✅ Webhook verified: ${evt.type}`);

  if (evt.type === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // Safety check for email
    const email =
      email_addresses && email_addresses[0]
        ? email_addresses[0].email_address
        : null;

    const userDoc = {
      _type: "user",
      _id: `user-${id}`,
      clerkId: id,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      email: email,
      image: image_url,
      createdAt: new Date().toISOString(),
    };

    try {
      await client.createOrReplace(userDoc);
      console.log(`🎉 User ${id} saved to Sanity!`);
    } catch (sanityErr) {
      console.error("❌ Sanity Write Failed:", sanityErr);
      return new Response("Error saving to Sanity", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
