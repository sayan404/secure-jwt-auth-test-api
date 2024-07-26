"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_jwt = exports.decode_jwt = exports.encode_jwt = void 0;
const crypto = __importStar(require("crypto"));
const base64UrlEncode = (input) => {
    return input.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
const base64UrlDecode = (input) => {
    input = input.replace(/-/g, "+").replace(/_/g, "/");
    switch (input.length % 4) {
        case 2:
            input += "=";
            break;
        case 3:
            input += "==";
            break;
    }
    return Buffer.from(input, "base64").toString();
};
const encode = (secret, header, payload) => {
    const headerBase64 = base64UrlEncode(Buffer.from(JSON.stringify(header)).toString("base64"));
    const payloadBase64 = base64UrlEncode(Buffer.from(JSON.stringify(payload)).toString("base64"));
    const data = `${headerBase64}.${payloadBase64}`;
    const signature = crypto
        .createHmac("sha256", secret)
        .update(data)
        .digest("base64");
    const signatureBase64 = base64UrlEncode(signature);
    return `${data}.${signatureBase64}`;
};
const decode = (secret, token) => {
    const [headerBase64, payloadBase64, signatureBase64] = token.split(".");
    const data = `${headerBase64}.${payloadBase64}`;
    const signatureCheck = crypto
        .createHmac("sha256", secret)
        .update(data)
        .digest("base64");
    const signatureCheckBase64 = base64UrlEncode(signatureCheck);
    if (signatureBase64 !== signatureCheckBase64)
        throw new Error("Invalid token signature");
    const header = JSON.parse(base64UrlDecode(headerBase64));
    const payload = JSON.parse(base64UrlDecode(payloadBase64));
    const { id, iat, exp, aud, iss } = payload, payloadWithoutId = __rest(payload, ["id", "iat", "exp", "aud", "iss"]);
    return { header, _id: id, iat, exp, payload: payloadWithoutId, aud, iss };
};
const encode_jwt = (secret, id, payload, ttl, aud, iss) => {
    const header = {
        alg: "HS256",
        typ: "JWT",
    };
    const issuedAt = Math.floor(Date.now() / 1000);
    const jwtPayload = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, payload), { id, iat: issuedAt }), (ttl ? { exp: issuedAt + ttl } : { exp: issuedAt })), (aud ? { aud } : {})), (iss ? { iss } : {}));
    try {
        const token = encode(secret, header, jwtPayload);
        return { success: true, token };
    }
    catch (error) {
        return { success: false, message: error.message };
    }
};
exports.encode_jwt = encode_jwt;
const decode_jwt = (secret, token) => {
    try {
        const { _id, iat, exp, payload, aud, iss } = decode(secret, token);
        if (exp && exp <= Math.floor(Date.now() / 1000))
            throw new Error("Oops! Token Expired");
        return {
            success: true,
            id: _id,
            payload: Object.assign({}, payload),
            aud,
            iss,
            created_at: iat * 1000,
            expires_at: exp * 1000,
        };
    }
    catch (error) {
        return { success: false, message: error.message };
    }
};
exports.decode_jwt = decode_jwt;
const validate_jwt = (secret, token, expectedAud, expectedIss) => {
    try {
        const { exp, aud, iss } = decode(secret, token);
        if (exp &&
            exp >= Math.floor(Date.now() / 1000) &&
            (expectedAud ? aud === expectedAud : true) &&
            (expectedIss ? iss === expectedIss : true))
            return true;
        return false;
    }
    catch (_a) {
        return false;
    }
};
exports.validate_jwt = validate_jwt;
