import { GameTypes } from './game-types';

export interface Combo {
  id: string;
  name: string;
  game: GameTypes;
  combo: string;
  description?: string;
  owner: {
    id: string;
    name: string;
  };
}
