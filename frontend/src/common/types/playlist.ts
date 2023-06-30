import { PlaylistCombo } from './playlist-combo';

export interface Playlist {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  owner: {
    id: string;
    name: string;
  };
  tags: Array<unknown>;
}

export interface PlaylistWithCombos extends Playlist {
  playlistCombos: Array<PlaylistCombo>;
}
