interface SuccessDecodeReponse {
  id: string | number;
  payload: object;
  created_at: number;
  expires_at: number;
  success: boolean;
}
interface ErrorResponse {
  message: string;
  success: boolean;
}
export type DecodeReponse = SuccessDecodeReponse | ErrorResponse;

interface SuccessEncodeReponse {
  success: boolean;
  token: string;
}
interface ErrorEncodeResponse {
  success: boolean;
  message: string;
}
export type EncodeReponse = SuccessEncodeReponse | ErrorEncodeResponse;
