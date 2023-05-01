import { GameTypes } from './game-types';

export interface Combo {
  id: number;
  name: string;
  game: GameTypes;
  combo: string;
  description?: string;
  owner: {
    id: number;
    name: string;
  };
}
