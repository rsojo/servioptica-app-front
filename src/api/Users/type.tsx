export interface GetUsersActivesResponse {
  data: Array<GetUsersActivesData>;
  error: boolean;
  message: string;
}
export interface GetUsersActivesData {
  id: number;
  created_at: string;
  updated_at: string;
  date: string;
  document: string;
  email: string;
  email_verified_at: string;
  name: string;
  status: number;
}

export interface AddUsersRequest {
  token: string;
  name: string;
  document: string;
  email: string;
  password: string;
}
export interface UpdateUsersRequest {
  token: string;
  name: string;
  password: string | null;
  status: number;
}
