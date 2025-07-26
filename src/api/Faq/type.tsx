export interface GetFaqActivesResponse {
  data: Array<GetFaqActivesData>;
  error: boolean;
  message: string;
  mensaje: string;
}
export interface GetFaqActivesData {
  answer: string;
  created_at: string;
  id: number;
  question: string;
  status: number;
  updated_at: string;
}
