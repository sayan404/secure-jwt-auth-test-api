import { decode_jwt } from "@/jwt-ts-package/dist/src";
import { NextRequest, NextResponse } from "next/server";

const SECRET = "mysecret"; // Use environment variables in production

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const decoded = decode_jwt(SECRET, token);
    console.log("decode", decoded);

    return NextResponse.json(decoded, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
