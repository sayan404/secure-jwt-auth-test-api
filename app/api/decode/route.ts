import { decode_jwt } from "@/jwt-ts-package/src";
import { NextRequest, NextResponse } from "next/server";
import { SuccessDecodeReponse } from "@/jwt-ts-package/src/type";
const SECRET = "your-256-bit-secret"; // Use environment variables in production

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const decoded = decode_jwt(SECRET, token);
    if (decoded.success) {
      return NextResponse.json(decoded, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
