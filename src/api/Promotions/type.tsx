export interface GetPromotionsActivesResponse {
  data: Array<GetPromotionsActivesData>;
  error: boolean;
  message: string;
}
export interface GetPromotionsActivesData {
  id: 2;
  title: string;
  img: string;
  link: string;
  description: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}
