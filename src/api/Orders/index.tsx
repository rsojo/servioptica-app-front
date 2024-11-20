import { OrderRequest, OrdersResponse } from "./type";

const devUrl = "http://127.0.0.1:8000";

export async function Orders(props: OrderRequest): Promise<OrdersResponse> {
  const url = `${devUrl}/api/orders`;
  //console.log("[Orders] [PREV]", props, url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({ ...props })
    });
    const responseData: OrdersResponse = await response.json();
    //console.log("[Orders] [responseData]", responseData);
    return responseData;
  } catch (error: any) {
    console.error("[Orders] [Error]", error);
    throw error; // Lanza el error para manejo externo si es necesario
  }
}

export async function ExportCsv(props: OrderRequest): Promise<OrdersResponse> {
  const url = `${devUrl}/api/orders/exportCsv`;
  console.log("[ExportCsv] [PREV]", props, url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({ ...props })
    });
    const responseData: OrdersResponse = await response.json();
    console.log("[ExportCsv] [responseData]", responseData);
    return responseData;
  } catch (error: any) {
    console.error("[ExportCsv] [Error]", error);
    throw error; // Lanza el error para manejo externo si es necesario
  }
}
