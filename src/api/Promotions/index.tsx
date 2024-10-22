import { GetPromotionsActivesResponse } from "./type";

const devUrl = "https://tracking-servioptica-api.txt.co";

export async function getPromotionsActives(): Promise<GetPromotionsActivesResponse> {
  const url = `${devUrl}/api/promotions/getActives`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const responseData: GetPromotionsActivesResponse = await response.json();
    console.log("[getFaqActives] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    return error as any;
  }
}
