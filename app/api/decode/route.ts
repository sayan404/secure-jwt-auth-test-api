import {
  DecodeReponse,
  ErrorDecodeResponse,
  SuccessDecodeResponse,
} from "secure-jwt-auth/dist/type";
import { NextRequest, NextResponse } from "next/server";
const SECRET = process.env.JWT_SECRET!
import { decodeToken } from "secure-jwt-auth";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const decoded: DecodeReponse = decodeToken(SECRET, token);
    if (decoded.success) {
      const successResponse = decoded as SuccessDecodeResponse;
      return NextResponse.json(successResponse, { status: 200 });
    }
    const { message } = decoded as ErrorDecodeResponse;
    return NextResponse.json({ message }, { status: 498 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
