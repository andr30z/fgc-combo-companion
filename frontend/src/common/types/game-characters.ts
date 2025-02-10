import { GameTypes } from './game-types';

export interface GameCharacter {
  id: number;
  name: string;
  code: string;
  game: GameTypes;
}
