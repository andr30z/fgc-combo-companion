import { API_URLS, fgcApi } from '@/common/services/fgc-api';
import type { LoginRequest, LoginResponse } from '@/common/types/login';
import { promiseResultWithError } from '@/common/utils/Promises';
import type { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOption: NextAuthOptions = {
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
        const { error, result } = await promiseResultWithError(
          fgcApi.post<LoginResponse>(API_URLS.LOGIN, {
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
        return result?.data.user as unknown as NextAuthUser;
      },
    }),
  ],
  callbacks: {
    // async signIn({ account, profile }) {
    //   console.log(account, profile)
    //   // if (account?.provider === 'google') {
    //   //   return profile.email_verified && profile.email.endsWith('@example.com');
    //   // }
    //   return true; // Do different verification for other providers that don't have `email_verified`
    // },
  },
};

export default NextAuth(authOption);
