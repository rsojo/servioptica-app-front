export interface GetPromotionsActivesResponse {
  data: Array<GetPromotionsActivesData>;
  error: boolean;
  message: string;
}
export interface GetPromotionsActivesData {
  id: number;
  title: string;
  img: string;
  link: string;
  description: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  date: string;
}

export interface AddPromotionsRequest {
  token: string;
  title: string;
  description: string;
  end_date: string;
  start_date: string;
  img?: string;
  link: string;
}