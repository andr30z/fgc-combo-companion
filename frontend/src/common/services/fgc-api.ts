import axios from 'axios';
import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { ReadonlyRequestCookies } from 'next/dist/server/app-render';

export const FGC_API_URL = 'http://localhost:8080/api';
export function getFgcApiInstance() {
  return axios.create({
    baseURL: FGC_API_URL,
    withCredentials: true,
  });
}

export function getFgcApiInstanceWithTokenCookie(
  cookies: RequestCookies | ReadonlyRequestCookies,
) {
  return axios.create({
    baseURL: FGC_API_URL,
    withCredentials: true,
    headers: {
      Cookie: `accessToken=${cookies.get('accessToken')?.value}`,
    },
  });
}

export const fgcApi = getFgcApiInstance();

export const FGC_API_URLS = {
  LOGIN: '/v1/users/login',
  REFRESH_TOKEN: '/v1/users/refresh',
  SIGNUP: '/v1/users',
  ME: '/v1/users/me',
  OAUTH_LOGIN: '/v1/users/oauth/login',
  PASSWORD_CHANGE: '/v1/users/password-change',
  PASSWORD_CHANGE_SOLICITATION: '/v1/users/password-change-solicitation',
  EMAIL_VERIFICATION: '/v1/users/email-verification',
  GET_USER_VERIFICATION: '/v1/users/verification',
  COMBOS: '/v1/combos',
  MY_COMBOS: '/v1/combos/me',
};
