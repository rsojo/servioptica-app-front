import { OrderRequest, OrdersResponse } from "./type";

const devUrl = "http://127.0.0.1:8000";

export async function Orders(props: OrderRequest): Promise<OrdersResponse> {
  const url = new URL(`${devUrl}/api/orders`);

  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  console.log("[Orders] [PREV]", props, url.toString());

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    });
    const responseData: OrdersResponse = await response.json();
    console.log("[Orders] [responseData]", responseData, response);
    return responseData;
  } catch (error: any) {
    console.error("[Orders] [Error]", error);
    throw error; // Lanza el error para manejo externo si es necesario
  }
}

