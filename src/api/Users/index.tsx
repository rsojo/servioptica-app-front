import {
  AddUsersRequest,
  GetUsersActivesResponse,
  UpdateUsersRequest,
} from "./type";

const devUrl = "https://tracking-servioptica-api.txt.co";

export async function getUsersAdmin(
  token: string
): Promise<GetUsersActivesResponse> {
  const url = `${devUrl}/api/users`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData: GetUsersActivesResponse = await response.json();
    console.log("[getUsersAdmin] [responseData]", responseData);
    return responseData;
  } catch (error: any) {
    console.error("[getUsersAdmin] [error]", error);
    return error;
  }
}

export async function addUsersAdmin(
  props: AddUsersRequest
): Promise<GetUsersActivesResponse> {
  const url = `${devUrl}/api/users`;
  console.log("[addUsersAdmin] [PREV]", props);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({ ...props, status: 1 }),
    });
    console.log("[addUsersAdmin] [response]", response);

    const responseData: GetUsersActivesResponse = await response.json();
    console.log("[addUsersAdmin] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    console.error("[addUsersAdmin] [error]", error);
    return error;
  }
}

export async function updateUsersAdmin(
  props: Partial<UpdateUsersRequest> & {
    id: number;
  }
): Promise<any> {
  const url = `${devUrl}/api/users/${props.id}`;
  const { password, ...otherProps } = props;
  const preData = password?.length === 0 ? { ...otherProps } : { ...props };

  console.log("[updateUsersAdmin] [PREV]", { ...preData });

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({ ...preData }),
    });
    console.log("[updateUsersAdmin] [response]", response);
    const responseData = await response.json();
    console.log("[updateUsersAdmin] [responseData]", responseData);
    if (response.status !== 200) {
      return false;
    }

    return true;
  } catch (error: any) {
    console.error("[updateUsersAdmin] [error]", error);
    return error;
  }
}

export async function removeUsersAdmin({
  token,
  id,
}: {
  token: string;
  id: number;
}): Promise<any> {
  const url = `${devUrl}/api/users/${id}`;
  console.log("[removeUsersAdmin] [PREV]", id);

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
    console.log("[removeUsersAdmin] [response]", response);
    if (response.status !== 204) {
      return false;
    }
    return true;
  } catch (error: any) {
    console.error("[removeUsersAdmin] [error]", error);
    return error;
  }
}
