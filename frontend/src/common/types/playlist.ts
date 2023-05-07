import { PlaylistCombo } from './playlist-combo';

export interface Playlist {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  owner: {
    id: number;
    name: string;
  };
  tags: Array<unknown>;
}

export interface PlaylistWithCombos extends Playlist {
  playlistCombos: Array<PlaylistCombo>;
}
