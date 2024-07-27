<p align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/uploadika-b352f.appspot.com/o/images%2Fsecure-jwt.png?alt=media&token=0f3ecf86-a6b4-49ec-a3af-7de8213ee11a" alt="secure-jwt-auth">
</p>

<br>
<br>

# Setup

```bash
git clone https://github.com/sayan404/secure-jwt-auth-test-api.git

cd secure-jwt-auth

npm install

npm run dev
```

# Usage

### Encoding a JWT

To encode a JWT, use the genToken method:

```bash
import { genToken } from 'secure-jwt-auth';

const token = genToken(SECRET, id , payload , ttl);
```

### Decoding a JWT

To decode a JWT, use the decodeToken method:

```bash
import { decodeToken } from 'secure-jwt-auth';

const decoded = decodeToken(SECRET, token);
```

### Validating a JWT

To validate a JWT, use the validateToken method:

```bash
import { validateToken } from 'secure-jwt-auth';

const isValid = validateToken(SECRET, token);
```

## API Playground

Explore and interact with the `secure-jwt-auth` package using the API Playground set up for testing. You can experiment with encoding, decoding, and validating JWTs through the following link:

### **[API Playground on Postman](https://documenter.getpostman.com/view/23890489/2sA3kYk1S8)**

Feel free to test various endpoints and see how the package functions in different scenarios and if something weired occurs please feel free to reach out to me at sayanmajumder0002@gmail.com.
