import axios, { CreateAxiosDefaults } from 'axios';
import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const FGC_API_URL = process.env.FGC_API_URL
  ? process.env.FGC_API_URL
  : 'http://localhost:8080/api';
export function getFgcApiInstance(
  config?: CreateAxiosDefaults<unknown> | undefined,
) {
  return axios.create({
    baseURL: FGC_API_URL,
    withCredentials: true,
    ...config,
  });
}

export function getFgcApiInstanceWithTokenCookie(
  cookies: RequestCookies | ReadonlyRequestCookies,
) {
  return getFgcApiInstance({
    headers: {
      Cookie: `accessToken=${cookies.get('accessToken')?.value}`,
    },
  });
}

export const fgcApi = getFgcApiInstance({
  headers: {
    'Access-Control-Allow-Credentials': true,
  },
});

export const FGC_API_URLS = {
  USER_PUBLIC_PROFILE: '/v1/profile',
  SEARCH: '/v1/search',
  USERS: '/v1/users',
  USER_PLAYLISTS: '/v1/playlists/users',
  USER_COMBOS: '/v1/combos/users',
  LOGIN: '/v1/users/login',
  UPDATE_PROFILE: '/v1/users/me',
  REFRESH_TOKEN: '/v1/users/refresh',
  SIGNUP: '/v1/users',
  ME: '/v1/users/me',
  OAUTH_LOGIN: '/v1/users/oauth/login',
  PASSWORD_CHANGE: '/v1/users/me/password',
  CONFIRM_PASSWORD_CHANGE: '/v1/users/password-change',
  PASSWORD_CHANGE_SOLICITATION: '/v1/users/password-change-solicitation',
  EMAIL_VERIFICATION: '/v1/users/email-verification',
  GET_USER_VERIFICATION: '/v1/users/verification',
  COMBOS: '/v1/combos',
  MY_COMBOS: '/v1/combos/me',
  getUpdateComboUrl: (comboId: string) => `/v1/combos/${comboId}`,
  PLAYLISTS: '/v1/playlists',
  getUpdatePlaylistUrl: (playlistId: string) => `/v1/playlists/${playlistId}`,
  getDeleteComboUrl: (comboId: string) => `/v1/combos/${comboId}`,
  getDeletePlaylistUrl: (playlistId: string) => `/v1/playlists/${playlistId}`,
  MY_PLAYLISTS: '/v1/playlists/me',
  getRemoveCombosFromPlaylistUrl: (
    playlistId: string,
    playlistComboIds: Array<string>,
  ) =>
    `/v1/playlists/${playlistId}/combos?${playlistComboIds
      .map((id) => `playlistComboId=${id}`)
      .join('&')}`,
  getAddCombosToPlaylistUrl: (playlistId: string) =>
    `/v1/playlists/${playlistId}/combos`,
  getCreateAndAddCombosToPlaylistUrl: (playlistId: string) =>
    `/v1/playlists/${playlistId}/new-combo`,
  getPlaylistCombosOrdenationUrl: (playlistId: string) =>
    `/v1/playlists/${playlistId}/combos/ordenation`,
  USER_EMAIL_VERIFICATION: '/v1/users/email-verification-solicitation',
};
