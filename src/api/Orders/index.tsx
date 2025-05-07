import { OrderRequest, OrdersResponse } from "./type";

//const devUrl = "http://127.0.0.1:8000";
const devUrl = process.env.REACT_APP_BASE_URL

export async function Orders(props: OrderRequest): Promise<OrdersResponse> {
  const url = `${devUrl}/api/orders`;
  console.log("[Orders] [PREV]", props, url); // TODO: Eliminar console.log en producción

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
    console.log("[Orders] [responseData]", responseData); // TODO: Eliminar console.log en producción
    return responseData;
  } catch (error: any) {
    console.error("[Orders] [Error]", error);
    throw error; // Lanza el error para manejo externo si es necesario
  }
}

export async function ExportCsv(props: OrderRequest): Promise<void> {
  const url = `${devUrl}/api/orders/exportCsv`;
  // console.log("[ExportCsv] [PREV]", props, url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/csv",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({ ...props }),
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta del servidor: ${response.status}`);
    }

    const blob = await response.blob();

    const urlBlob = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlBlob;
    a.download = "exported_orders.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

   //  console.log("[ExportCsv] Archivo descargado correctamente.");
  } catch (error: any) {
    console.error("[ExportCsv] [Error]", error);
    throw error; // Lanza el error para manejo externo si es necesario
  }
}

