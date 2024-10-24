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

export async function getFaqAdmin(
  token: string
): Promise<GetFaqActivesResponse> {
  const url = `${devUrl}/api/faqs`;
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
export async function addFaqAdmin({
  token,
  question,
  answer,
}: {
  token: string;
  question: string;
  answer: string;
}): Promise<GetFaqActivesResponse> {
  const url = `${devUrl}/api/faqs`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question: question, answer: answer }),
    });

    const responseData: GetFaqActivesResponse = await response.json();
    console.log("[getFaqAdmin] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    console.error("[getFaqAdmin] [error]", error);
    return error;
  }
}
export async function updateFaqAdmin({
  token,
  id,
  question,
  answer,
}: {
  token: string;
  id: number;
  question: string;
  answer: string;
}): Promise<GetFaqActivesResponse> {
  const url = `${devUrl}/api/faqs`;
  try {
    const response = await fetch(url, {
      method: "PUT",
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
export async function removeFaqAdmin({
  token,
  id,
}: {
  token: string;
  id: number;
}): Promise<GetFaqActivesResponse> {
  const url = `${devUrl}/api/faqs`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
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
