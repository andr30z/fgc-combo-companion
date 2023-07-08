export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  isOAuthUser: boolean;
  bio?: string;
  twitterProfileUrl?: string;
  instagramProfileUrl?: string;
  youtubeChannelUrl?: string;
}
