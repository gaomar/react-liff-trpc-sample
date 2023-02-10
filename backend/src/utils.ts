import axios from "axios";
import { LINE_CHANNEL_ID } from "@/config";

const axiosLINE = axios.create({
  baseURL: "https://api.line.me",
  responseType: "json",
});

/**
 * 渡されたLINEトークンが正しいものかを検証
 * @param {string} accessToken アクセストークン
 */
export async function verifyToken(accessToken: string) {
  const response = await axiosLINE.get("/oauth2/v2.1/verify", {
    params: { access_token: accessToken },
  });
  if (response.status !== 200) {
    console.error(response.data.error_description);
    throw new Error(response.data.error);
  }
  // チャネルIDをチェック
  if (response.data.client_id !== LINE_CHANNEL_ID) {
    throw new Error(JSON.stringify({ errorCode: 2000 }));
  }
  //アクセストークンの有効期限
  if (response.data.expires_in < 0) {
    throw new Error(JSON.stringify({ errorCode: 2001 }));
  }
}

/**
 * LINEプロフィール情報取得
 * @param {String} accessToken アクセストークン
 * @returns LINEプロフィール
 */
export async function getProfile(accessToken: string) {
  const response = await axiosLINE.get("/v2/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {},
  });
  if (response.status !== 200) {
    console.error(response.data.error_description);
    console.error(response.data.error);
    throw new Error(JSON.stringify({ errorCode: 2002 }));
  }
  return response.data;
}
