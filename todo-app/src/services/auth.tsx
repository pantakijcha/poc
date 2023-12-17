import api from "./api";

type GetAccessTokenPayload = {
  username?: string;
  password?: string;
};

type GetAccessTokenResponse = {
  token: string;
};

export async function getAccessToken(payload: GetAccessTokenPayload) {
  const { data } = await api.post<GetAccessTokenResponse>(
    "users/auth",
    payload
  );
  return data;
}
