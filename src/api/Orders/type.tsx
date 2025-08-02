export interface OrdersResponse {
  data: Array<OrderData>;
  error: boolean;
  message: string;
}
/*
export interface OrderData {
  id?:number;
  seq_no: string;
  fecha_entrada_pedido: string;
  id_pedido: string;
  lote: string | null;
  estado: string;
  fecha_estado: string;
  fecha_estimada: string;
  fecha_recalculo: string | null;
  id_cliente: string;
  cliente: string;
  fecha_actualizacion: string;
  nit: string;
  cliente_contacto: string | null;
  UsuarioNombres: string;
};
*/
export interface OrderData {
  id?: number;
  document_no: string;
  seq_no: string;
  seq_no_original: string;
  fecha_entrada: string;
  pedido: string;
  pedido_cliente: string;
  lote_num_laboratorio: string | null;
  estado: string;
  fecha_estado: string;
  fecha_estimada: string;
  fecha_recalculo: string | null;
  fecha_modificacion: string;
  id_cliente_contacto: string;
  razon_social: string;
  nit: string;
  cliente_contacto: string | null;
  escenario: string;
}




export interface OrderRequest {
  token: string;
  nit: string
  pageSize: number,
  pageNumber: number,
  status: string | null,
  document: string | null,
  orderCode: string | null,
  site: string | null,
  date: string | null,
}