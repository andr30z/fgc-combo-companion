import type { Combo } from './combo';
import type { FGCApiPaginationResponse } from './fgc-api-pagination-response';
import type { Playlist } from './playlist';
import type { User } from './user';

export interface UserProfile {
  user: User;
  combos: FGCApiPaginationResponse<Combo>;
  playlists: FGCApiPaginationResponse<Playlist>;
}
