# Setup

```bash
git clone https://github.com/sayan404/simpler-jwt-auth.git
cd simpler-jwt-auth
```

# Usage

### Encoding a JWT

To encode a JWT, use the encode_jwt method:

```bash
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

```

### Decoding a JWT

To decode a JWT, use the decode_jwt method:

```bash
import { decode_jwt } from "@/jwt-ts-package/src";
import { NextRequest, NextResponse } from "next/server";
const SECRET = "your-256-bit-secret"; // Use environment variables

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

```

### Validating a JWT

To validate a JWT, use the validate_jwt method:

```bash

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

```

## API Playground

Explore and interact with the `simpler-jwt-auth` package using the API Playground set up for testing. You can experiment with encoding, decoding, and validating JWTs through the following link:

- **[API Playground on Postman](https://app.getpostman.com/join-team?invite_code=89ffb411ab1a8c3a3d425e5a5e0db76c)**

Feel free to test various endpoints and see how the package functions in different scenarios and if something weired occurs you can reach out to me at sayanmajumder0002@gmail.com.
