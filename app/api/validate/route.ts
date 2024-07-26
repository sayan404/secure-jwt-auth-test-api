import { validate_jwt } from "@/jwt-ts-package/src";
import { NextRequest, NextResponse } from "next/server";

const SECRET = "your-256-bit-secret"; // Use your environment variables

export async function POST(req: NextRequest) {
  const { token, expectedAud, expectedIss } = await req.json();

  const isValid = validate_jwt(SECRET, token, expectedAud, expectedIss);
  if (!isValid) {
    return NextResponse.json(
      { valid: isValid, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
  return NextResponse.json(
    { valid: isValid, message: "Valid Token" },
    { status: 200 }
  );
}
