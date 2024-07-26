# Setup
`````bash
git clone https://github.com/sayan404/simpler-jwt-auth.git
cd simpler-jwt-auth
`````

# Usage
### Encoding a JWT
To encode a JWT, use the encode_jwt method:

`````bash
import { encode_jwt } from 'simpler-jwt-auth';

const secret = 'your-256-bit-secret';
const id = '12345';
const payload = { data: 'test' };
const ttl = 3600; // Time to live in seconds
const audience = 'https://myapi.example.com';
const issuer = 'https://auth.example.com';

const token = encode_jwt(secret, id, payload, ttl, audience, issuer);
console.log('Encoded JWT:', token);

`````

### Decoding a JWT
To decode a JWT, use the decode_jwt method:

`````bash
import { decode_jwt } from 'simpler-jwt-auth';

const secret = 'your-256-bit-secret';
const token = 'your-jwt-token';

try {
  const decoded = decode_jwt(secret, token);
  console.log('Decoded JWT:', decoded);
} catch (error) {
  console.error('Error decoding JWT:', error.message);
}

`````
### Validating a JWT

To validate a JWT, use the validate_jwt method:

`````bash
import { validate_jwt } from 'simpler-jwt-auth';

const secret = 'your-256-bit-secret';
const token = 'your-jwt-token';

const isValid = validate_jwt(secret, token);
console.log('Is JWT valid?', isValid);

`````
## API Playground

Explore and interact with the `simpler-jwt-auth` package using the API Playground set up for testing. You can experiment with encoding, decoding, and validating JWTs through the following link:

- **[API Playground on Postman](https://app.getpostman.com/join-team?invite_code=89ffb411ab1a8c3a3d425e5a5e0db76c)**

Feel free to test various endpoints and see how the package functions in different scenarios and if something weired occurs you can reach out to me at sayanmajumder0002@gmail.com.
