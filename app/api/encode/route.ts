import { genToken } from "secure-jwt-auth";
import {
  EncodeReponse,
  SuccessEncodeResponse,
  ErrorEncodeResponse,
} from "secure-jwt-auth/dist/type";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const { id, payload, ttl, audience, issuer } = await req.json();
  try {
    if (id) {
      const response: EncodeReponse = genToken(
        SECRET,
        id,
        payload,
        ttl,
        audience,
        issuer
      );

      if (response.success) {
        const { token } = response as SuccessEncodeResponse;
        return NextResponse.json({ token }, { status: 200 });
      }
      const { message } = response as ErrorEncodeResponse;
      return NextResponse.json({ message }, { status: 400 });
    }
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong while decoding" },
      { status: 500 }
    );
  }
}
