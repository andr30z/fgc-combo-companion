import type { Combo } from './combo';

export interface PlaylistCombo {
  id: number;
  position: number;
  combo: Combo;
  addedAt: string;
}
