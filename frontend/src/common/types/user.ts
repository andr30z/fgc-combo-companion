import { AuthProviderTypes } from './auth-types';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  emailVerified: boolean;
  authProvider?: AuthProviderTypes;
}
