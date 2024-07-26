import { encode_jwt } from "@/jwt-ts-package/src";
import { EncodeReponse, SuccessEncodeReponse, ErrorEncodeResponse } from "@/jwt-ts-package/src/type";
import { NextRequest, NextResponse } from "next/server";

const SECRET = "your-256-bit-secret"; // Use environment variables in production

export async function POST(req: NextRequest) {
  const { id, payload, ttl } = await req.json();
  
  const EXPECTED_AUDIENCE = "https://myapi.example.com";
  const EXPECTED_ISSUER = "https://auth.example.com";
  // Validate `id` type
  if (typeof id === "string" || typeof id === "number") {
    // Encode the JWT
    const response: EncodeReponse = encode_jwt(SECRET, id, payload, ttl, EXPECTED_AUDIENCE, EXPECTED_ISSUER);

    // Check if encoding was successful
    if (response.success) {
      // Use type assertion to safely access `token`
      const { token } = response as SuccessEncodeReponse;
      return NextResponse.json({ token }, { status: 200 });
    } else {
      // Handle error case
      const { message } = response as ErrorEncodeResponse;
      return NextResponse.json({ message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }
}
