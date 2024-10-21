export interface LoginRequest {
  document: string;
  password: string;
}
export interface LoginResponse {
  data: { access_token: string; token_type: string } | null;
  message: string;
  error: boolean;
}

export interface CheckClientRequest {
  document: string;
}
export type CheckClientData = {
  name: string;
  document: string;
  email: string;
  status: "Inactive" | "Active" | "Suspended" | null;
};

export interface CheckClientResponse {
  data: Array<CheckClientData> | null;
  message: string;
  error: boolean;
  code: number;
}

export interface RegisterRequest {
  name: string;
  document: string;
  email: string;
}
export interface RegisterResponse {
  data: any;
  message: string;
  error: boolean;
}
