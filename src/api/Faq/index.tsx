import { GetFaqActivesResponse } from "./type";

const devUrl = "https://tracking-servioptica-api.txt.co";

export async function getFaqActives(): Promise<GetFaqActivesResponse> {
  const url = `${devUrl}/api/faqs/getActives`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const responseData: GetFaqActivesResponse = await response.json();
    console.log("[getFaqActives] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    return error;
  }
}

export async function getFaqAdmin(token: string): Promise<GetFaqActivesResponse> {
  const url = `${devUrl}/api/faqs/getActives`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    const responseData: GetFaqActivesResponse = await response.json();
    console.log("[getFaqAdmin] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    console.error("[getFaqAdmin] [error]", error);
    return error;
  }
}
