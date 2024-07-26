import { DecodeReponse, EncodeReponse } from "./type";
export declare const encode_jwt: (secret: string, id: string | number, payload: object, ttl?: number, aud?: string, iss?: string) => EncodeReponse;
export declare const decode_jwt: (secret: string, token: string) => DecodeReponse;
export declare const validate_jwt: (secret: string, token: string, expectedAud?: string, expectedIss?: string) => boolean;
