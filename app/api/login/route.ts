import { encode_jwt } from "@/jwt-ts-package/dist/src";
import { NextRequest, NextResponse } from "next/server";
const SECRET = "mysecret"; // Use environment variables in production

export async function POST(req: NextRequest, res: NextResponse) {
  const { id, payload, ttl } = await req.json();

  if (typeof id === "string" || typeof id === "number") {
    const token = encode_jwt(SECRET, id, payload, ttl);
    // res.status(200).json({ token });
    return NextResponse.json({ token }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }
}
