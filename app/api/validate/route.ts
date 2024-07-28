import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "secure-jwt-auth";

const SECRET = process.env.JWT_SECRET!;
export async function POST(req: NextRequest) {
  const { token, expectedAud, expectedIss } = await req.json();
  try {
    const isValid: boolean = validateToken(
      SECRET,
      token,
      expectedAud,
      expectedIss
    );
    if (!isValid) {
      return NextResponse.json(
        { valid: isValid, message: "Invalid or expired token" },
        { status: 498 }
      );
    }
    return NextResponse.json(
      { valid: isValid, message: "Valid Token" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
