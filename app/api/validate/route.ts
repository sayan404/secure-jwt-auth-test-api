import { validate_jwt } from "@/jwt-ts-package/dist/src";
import { NextRequest, NextResponse } from "next/server";

const SECRET = "mysecret"; // Use environment variables in production

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const isValid = validate_jwt(SECRET, token);
  return NextResponse.json({ valid: isValid }, { status: 200 });
}
