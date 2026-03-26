export interface LoginRequest {
  document: string;
  password: string;
}
export interface LoginResponse {
  data: { access_token: string; token_type: string; admin: boolean } | null;
  message: string;
  error: boolean;
  code?: number;
}

export interface OidcUser {
  id?: number;
  name?: string;
  email?: string;
  document?: string;
}

export interface OidcStartResponse {
  data: {
    authorization_url: string;
    state?: string;
  } | null;
  message: string;
  error: boolean;
  code?: number;
}

export interface OidcCallbackResponse {
  data: {
    access_token: string;
    token_type: string;
    admin: boolean;
    user?: OidcUser;
  } | null;
  message: string;
  error: boolean;
  code?: number;
}

export interface OidcLogoutResponse {
  data?: {
    end_session_url?: string;
  } | null;
  message: string;
  error: boolean;
  code?: number;
}

export interface MeResponse {
  data: {
    auth_source?: "oidc_client" | "local_admin" | string;
    type?: string;
    admin?: boolean;
    user?: OidcUser;
    oidc?: {
      id_contacto?: string;
      nit?: string;
      nombre?: string;
      razon_social?: string;
      punto?: string;
      grupo_empresarial?: string;
    };
  } | null;
  message: string;
  error: boolean;
  code?: number;
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
