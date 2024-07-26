# simpler-jwt-auth

`smpler-jwt-auth` is a lightweight package for creating, decoding, and validating JSON Web Tokens (JWTs) with support for basic JWT features. It provides three core methods for JWT operations:

- `genToken`
- `decodeToken`
- `validateToken`

## Features

- **`genToken(secret: string, id: string | number, payload: object, ttl?: number): string`**
  
  Creates a JWT using the provided secret, id, payload, and optional time-to-live (TTL) value. The generated token includes the specified claims and is signed using the provided secret.

- **`decodeToken(secret: string, jwt: string): { id: string | number, payload: object, expires_at: Date }`**
  
  Decodes a JWT back into its components, including the id and payload. Throws an error if the JWT cannot be decoded or if the signature is invalid.

- **`validateToken(secret: string, jwt: string): boolean`**
  
  Validates a JWT by decoding it and checking its expiry and signature. Returns `true` if the token is valid and `false` otherwise.

### Advanced Features (Optional)

- **Support for Additional JWT Parameters**
  
  The package also supports optional JWT parameters like `aud` (audience), `iat` (issued at), and `iss` (issuer). These parameters can be used to enhance token security and validation.

### Testing Features (Optional)

- **Unit Testing with Jest**
  
  The package utilizes Jest, a widely-used testing framework, to ensure the functionality and reliability of the JWT encoding, decoding, and validation methods. The unit tests cover various scenarios, including:

  - **Encoding**: Verifying that the `genToken` method correctly generates tokens with the specified payload, expiration time, and signature.
  - **Decoding**: Ensuring that the `decodeToken` method accurately parses tokens and extracts the correct payload and metadata.
  - **Validation**: Confirming that the `validateToken` method properly assesses token validity based on expiration and signature checks.

  The test suite is designed to provide comprehensive coverage and facilitate easy validation of changes and new features. To run the tests, use the following command:

  ```bash
  npm test
## Installation

To install `simpler-jwt-auth`, use npm:

```bash
npm install simpler-jwt-auth
npm install @types/simpler-jwt-auth
