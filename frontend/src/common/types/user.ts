import { AuthProviderTypes } from './auth-types';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  oauthId: string;
  authProvider?: AuthProviderTypes;
  bio?: string;
  twitterProfileUrl?: string;
  instagramProfileUrl?: string;
  youtubeChannelUrl?: string;
}
