import {
  CheckClientRequest,
  CheckClientResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  OidcCallbackResponse,
  OidcLogoutResponse,
  OidcStartResponse,
  RegisterRequest,
  RegisterResponse,
} from "./type";
import { getApiBaseUrl } from "../../utils/apiBaseUrl";

//const devUrl = "https://apitrazabilidadco.essilorluxottica.com";
const devUrl = getApiBaseUrl();

async function postLoginByPath(
  path: string,
  data: LoginRequest
): Promise<LoginResponse> {
  const url = `${devUrl}${path}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    if (!isJson) {
      return {
        data: null,
        error: true,
        code: response.status,
        message:
          response.status === 405
            ? "Endpoint de login no permite POST en este ambiente. Verifica ruta/API gateway."
            : `Respuesta no válida del servidor (${response.status}).`,
      };
    }

    const responseData: LoginResponse = await response.json();
    return { ...responseData, code: response.status };
  } catch (error: any) {
    console.error("[postLoginByPath] [error]", error);
    return {
      data: null,
      error: true,
      code: 0,
      message:
        error?.message ||
        "No fue posible conectar con el servidor. Verifica la URL de API y CORS.",
    };
  }
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  // console.log('[process.env.REACT_APP_BASE_URL]', process.env.REACT_APP_BASE_URL)
  return postLoginByPath("/api/auth/login", data);
}

export async function loginAdminUser(
  data: LoginRequest
): Promise<LoginResponse> {
  const adminLoginPath = (process.env.REACT_APP_ADMIN_LOGIN_PATH || "").trim();

  if (adminLoginPath) {
    return postLoginByPath(adminLoginPath, data);
  }

  const primary = await postLoginByPath("/api/auth/login", data);
  if (primary.code !== 404 && primary.code !== 405) {
    return primary;
  }

  const fallback = await postLoginByPath("/api/login", data);
  return fallback.code === 404 || fallback.code === 405 ? primary : fallback;
}

export async function oidcStart(returnTo?: string): Promise<OidcStartResponse> {
  const query = returnTo ? `?return_to=${encodeURIComponent(returnTo)}` : "";
  const url = `${devUrl}/api/auth/oidc/start${query}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const responseData: OidcStartResponse = await response.json();
    return { ...responseData, code: response.status };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      code: 0,
      message: error?.message || "No fue posible iniciar el flujo OpenID.",
    };
  }
}

export async function oidcCallback(data: {
  code: string;
  state: string;
}): Promise<OidcCallbackResponse> {
  const query = `?code=${encodeURIComponent(data.code)}&state=${encodeURIComponent(
    data.state
  )}`;
  const url = `${devUrl}/api/auth/oidc/callback${query}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    if (!isJson) {
      return {
        data: null,
        error: true,
        code: response.status,
        message: `Respuesta no válida del callback OIDC (${response.status}).`,
      };
    }

    const responseData: OidcCallbackResponse = await response.json();
    return { ...responseData, code: response.status };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      code: 0,
      message: error?.message || "Error en callback OIDC.",
    };
  }
}

export async function oidcLogout(token: string): Promise<OidcLogoutResponse> {
  const url = `${devUrl}/api/auth/oidc/logout`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: OidcLogoutResponse = await response.json();
    return { ...responseData, code: response.status };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      code: 0,
      message: error?.message || "No fue posible cerrar sesión OIDC.",
    };
  }
}

export async function oidcLogoutCallback(): Promise<{
  error: boolean;
  message: string;
  code?: number;
  data?: any;
}> {
  const url = `${devUrl}/api/auth/oidc/logout/callback`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    if (!isJson) {
      return {
        error: response.status >= 400,
        code: response.status,
        message: `Respuesta no válida en logout callback (${response.status}).`,
      };
    }

    const responseData = await response.json();
    return { ...responseData, code: response.status };
  } catch (error: any) {
    return {
      error: true,
      code: 0,
      message: error?.message || "No fue posible ejecutar logout callback OIDC.",
    };
  }
}

export async function getMe(token: string): Promise<MeResponse> {
  const url = `${devUrl}/api/auth/me`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: MeResponse = await response.json();
    return { ...responseData, code: response.status };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      code: 0,
      message: error?.message || "No fue posible validar la sesión.",
    };
  }
}

export async function checkClient(
  data: CheckClientRequest
): Promise<CheckClientResponse> {
  const url = `${devUrl}/api/checkClient`;
  // console.log("[checkClient] [PREV˝]", data, url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      redirect: "manual",
    });
    
    
    const responseData: CheckClientResponse = await response.json();
    // console.log("[checkClient] [responseData]", responseData);

    return { ...responseData, code: response.status };
  } catch (error: any) {
    return error as CheckClientResponse;
  }
}

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const url = `${devUrl}/api/auth/register`;
  // console.log("[register] [PREV]", data, url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      // redirect: "manual",
    });
    
    const responseData: RegisterResponse = await response.json();
    // console.log("[register] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    return error as RegisterResponse;
  }
}

export interface SendOtpResponse {
  message: string;
  data?: {
    email?: string;
    document?: string;
  };
  error: boolean;
  
}

export async function sendOtp(data: {
  email?: string;
  document?: string;
}): Promise<SendOtpResponse> {
  const url = `${devUrl}/api/auth/otp/send`;
  // console.log("[sendOtp] [PREV]", data, url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      redirect: "manual",
    });
    const responseData = await response.json();
    // console.log("[sendOtp] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    return error;
  }
}

export async function verifyOtp(data: {
  email?: string;
  document?: string;
  otp: string;
}): Promise<any> {
  const url = `${devUrl}/api/auth/otp/verify`;
  // console.log("[verifyOtp] [PREV]", data, url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    // console.log("[verifyOtp] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    return error;
  }
}

export async function assignPassword(data: {
  assignToken: string;
  document: string;
  password: string;
}): Promise<any> {
  const url = `${devUrl}/api/auth/assign-password`;
  // console.log("[assignPassword] [PREV]", data, url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    // console.log("[assignPassword] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    return error;
  }
}

export async function assignPasswordByEmail(data: {
  assignToken: string;
  email: string;
  password: string;
}): Promise<any> {
  const url = `${devUrl}/api/auth/assign-password`;
  // console.log("[assignPassword] [PREV]", data, url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    // console.log("[assignPassword] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    return error;
  }
}
