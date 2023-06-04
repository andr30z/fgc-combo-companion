'use client';

import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { LoginResponse } from '@/common/types/login';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FC, useEffect } from 'react';

export const RefreshToken: FC = () => {
  const { data: authSession, update } = useSession();

  const refreshToken = async () => {
    const response = await fgcApi.post<LoginResponse>(
      FGC_API_URLS.REFRESH_TOKEN,
    );
    await update(response.data.user);
    return response.data;
  };
  useEffect(
    function refreshTokenWhen401Response() {
      if (!authSession) {
        return;
      }

      const intercepetor = fgcApi.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error?.config;
          if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            await refreshToken();
            return axios(prevRequest);
          }

          return Promise.reject(error);
        },
      );
      return () => {
        fgcApi.interceptors.response.eject(intercepetor);
      };
    },
    [authSession],
  );
  return null;
};
