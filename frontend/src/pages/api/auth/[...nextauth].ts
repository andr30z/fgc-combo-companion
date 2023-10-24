/* eslint-disable @typescript-eslint/no-explicit-any */
import { FGC_API_URLS, getFgcApiInstance } from '@/common/services/fgc-api';
import { AuthProviderTypes } from '@/common/types/auth-types';
import type { LoginRequest, LoginResponse } from '@/common/types/login';
import type { User } from '@/common/types/user';
import { promiseResultWithError } from '@/common/utils/promises';
import type { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

function setCookies(
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: AxiosResponse<LoginResponse, any> | null,
) {
  const cookies = response?.headers['set-cookie'] ?? [];
  res.setHeader('Set-Cookie', cookies as string[]);
}

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
) => NextAuthOptions;

const getAuthOption: NextAuthOptionsCallback = (_, res) => ({
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: 'fgc-email-password',
      name: 'fgc-email-password',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as unknown as LoginRequest;
        const fgcApi = getFgcApiInstance();
        const { error, result } = await promiseResultWithError(
          fgcApi.post<LoginResponse>(FGC_API_URLS.LOGIN, {
            email,
            password,
          }),
        );
        if (error) {
          throw new Error(
            error.response?.data?.errors?.join(', ') ??
              'Something went wrong while logging in. Try again later.',
          );
        }
        setCookies(res, result);

        return result?.data.user as unknown as NextAuthUser;
      },
    }),
  ],
  events: {
    async signOut({ session, token }) {
      if (process.env.NODE_ENV === 'production') {
        res.setHeader('Set-Cookie', [
          'accessToken=deleted;Max-Age=0;path=/;domain=.fgc-combo-companion.xyz;',
          'refreshToken=deleted;Max-Age=0;path=/;domain=.fgc-combo-companion.xyz;',
        ]);
      } else {
        res.setHeader('Set-Cookie', [
          'accessToken=deleted;Max-Age=0;path=/;',
          'refreshToken=deleted;Max-Age=0;path=/;',
        ]);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      session = {} as any;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      token = {} as any;
    },
  },
  callbacks: {
    async signIn(data) {
      const { user, account } = data;
      if (account?.provider === 'fgc-email-password') {
        return true;
      }
      const fgcApi = getFgcApiInstance();
      const { error, result } = await promiseResultWithError(
        fgcApi.post<LoginResponse>(FGC_API_URLS.OAUTH_LOGIN, {
          email: user.email,
          name: user.name,
          authProvider: AuthProviderTypes.GOOGLE,
          oAuthId: user.id,
          oAuthSecretKey: process.env.OAUTH_SECRET_KEY,
        }),
      );
      if (!error) {
        setCookies(res, result);
        return true;
      }
      res.redirect(
        `/login?error=${
          error?.response?.data?.message ?? 'Something went wrong'
        }`,
      );
      throw new Error(error.response.message);
    },

    jwt: async (data) => {
      if (data.user) {
        data.token.user = data.user;
      }
      return data.token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as unknown as User;
      return session;
    },
  },
});
const nextAuth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, getAuthOption(req, res));
};
export default nextAuth;
