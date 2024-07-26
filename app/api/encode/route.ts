import { encode_jwt } from "@/jwt-ts-package/src";
import {
  EncodeReponse,
  SuccessEncodeReponse,
  ErrorEncodeResponse,
} from "@/jwt-ts-package/src/type";
import { NextRequest, NextResponse } from "next/server";

const SECRET = "your-256-bit-secret"; // Use environment variables in production

export async function POST(req: NextRequest) {
  const { id, payload, ttl, audience, issuer } = await req.json();
  try {
    if (id) {
      const response: EncodeReponse = encode_jwt(
        SECRET,
        id,
        payload,
        ttl,
        audience,
        issuer
      );

      if (response.success) {
        const { token } = response as SuccessEncodeReponse;
        return NextResponse.json({ token }, { status: 200 });
      }
      const { message } = response as ErrorEncodeResponse;
      return NextResponse.json({ message }, { status: 500 });
    }
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong while decoding" },
      { status: 500 }
    );
  }
}
