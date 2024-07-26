import { DecodeReponse, EncodeReponse } from "./type";
export declare const genToken: (secret: string, id: string | number, payload: object, ttl?: number, aud?: string, iss?: string) => EncodeReponse;
export declare const decodeToken: (secret: string, token: string) => DecodeReponse;
export declare const validateToken: (secret: string, token: string, expectedAud?: string, expectedIss?: string) => boolean;
