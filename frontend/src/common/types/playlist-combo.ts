import type { Combo } from './combo';

export interface PlaylistCombo {
  id: string;
  position: number;
  combo: Combo;
  addedAt: string;
}
