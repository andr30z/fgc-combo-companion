import { GameTypes } from './game-types';

export interface Combo {
  id: string;
  name: string;
  game: GameTypes;
  combo: string;
  createdAt: string;
  description?: string;
  totalDamage?: string | null;
  character?: string | null;
  owner: {
    id: string;
    name: string;
  };
}
