export interface Playlist {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  owner: {
    name: string;
  };
  tags: Array<unknown>;
}
