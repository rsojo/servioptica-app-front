import {
  CheckClientRequest,
  CheckClientResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./type";

const devUrl = "https://tracking-servioptica-api.txt.co";

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const url = `${devUrl}/api/auth/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }

    const responseData: LoginResponse = await response.json();
    console.log("[loginUser] [response]", responseData);

    return responseData;
  } catch (error: any) {
    return error as LoginResponse;
  }
}

export async function checkClient(
  data: CheckClientRequest
): Promise<CheckClientResponse> {
  const url = `${devUrl}/api/checkClient`;

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
    console.log("[checkClient] [response]", responseData);

    return { ...responseData, code: response.status };
  } catch (error: any) {
    return error as CheckClientResponse;
  }
}

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const url = `${devUrl}/api/auth/register`;
  console.log("[PREV] [register]", data);
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

    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }
    
    const responseData: RegisterResponse = await response.json();
    console.log("[register] [response]", responseData);

    return responseData;
  } catch (error: any) {
    return error as RegisterResponse;
  }
}
export async function sendOtp(data: {
  email: string;
}): Promise<any> {
  const url = `${devUrl}/api/auth/otp/send`;

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
    console.log("[sendOtp] [response]", responseData);

    return responseData;
  } catch (error: any) {
    return error;
  }
}
export async function verifyOtp(data: {
  email: string;
  otp: string;
}): Promise<any> {
  const url = `${devUrl}/api/auth/otp/send`;

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
    console.log("[verifyOtp] [response]", responseData);

    return responseData;
  } catch (error: any) {
    return error;
  }
}
export async function assignPassword(data: {
  token: string;
  document: string;
  password: string;
}): Promise<any> {
  const url = `${devUrl}/api/auth/assign-password`;

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
    console.log("[assignPassword] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    return error;
  }
}
