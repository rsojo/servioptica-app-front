import { AddPromotionsRequest, GetPromotionsActivesResponse } from "./type";

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
    console.log("[getPromotionsActives] [responseData]", responseData);
    return responseData;
  } catch (error: any) {
    return error as any;
  }
}

export async function getPromotionsAdmin(
  token: string
): Promise<GetPromotionsActivesResponse> {
  const url = `${devUrl}/api/promotions`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData: GetPromotionsActivesResponse = await response.json();
    console.log("[getPromotionsAdmin] [responseData]", responseData);
    return responseData;
  } catch (error: any) {
    console.error("[getPromotionsAdmin] [error]", error);
    return error;
  }
}

export async function addPromotionsAdmin(
  props: AddPromotionsRequest
): Promise<GetPromotionsActivesResponse> {
  const url = `${devUrl}/api/promotions`;
  console.log("[addPromotionsAdmin] [PREV]", props);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({ ...props }),
    });

    const responseData: GetPromotionsActivesResponse = await response.json();
    console.log("[addPromotionsAdmin] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    console.error("[addPromotionsAdmin] [error]", error);
    return error;
  }
}

export async function updatePromotionsAdmin(props: Partial<AddPromotionsRequest> & {
  id: number;
}): Promise<any> {
  const url = `${devUrl}/api/promotions/${props.id}`;
  console.log("[updatePromotionsAdmin] [PREV]", props);

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({...props}),
    });
    console.log("[updatePromotionsAdmin] [response]", response);
    if (response.status !== 200) {
      return false;
    }
    return true;
  } catch (error: any) {
    console.error("[updatePromotionsAdmin] [error]", error);
    return error;
  }
}

export async function removePromotionsAdmin({
  token,
  id,
}: {
  token: string;
  id: number;
}): Promise<any> {
  const url = `${devUrl}/api/promotions/${id}`;
  console.log("[removePromotionsAdmin] [PREV]", id);

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id }),
    });
    console.log("[removePromotionsAdmin] [response]", response);
    if (response.status !== 204) {
      return false;
    }
    return true;
  } catch (error: any) {
    console.error("[removePromotionsAdmin] [error]", error);
    return error;
  }
}
