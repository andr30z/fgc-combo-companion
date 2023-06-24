import { Link } from '@/common/components/link';
import { UserPreview } from '@/common/components/user-preview';
import type { Playlist } from '@/common/types/playlist';
import type { FC } from 'react';

interface ListPlaylistProps {
  playlists: Array<Playlist>;
}

export const ListPlaylists: FC<ListPlaylistProps> = ({ playlists }) => {
  return (
    <section className="w-full md:w-1/2 flex flex-col gap-2">
      <h6 className="font-bold text-light text-3xl">Playlists</h6>
      {playlists.map(({ name, description, owner, id }) => (
        <Link
          key={id}
          href={`/playlist/${id}`}
          className="rounded-lg flex flex-col gap-2 w-full px-4 py-3 bg-secondary-dark hover:bg-opacity-50"
        >
          <p
            title={name}
            className="text-light text-lg font-semibold line-clamp-1"
          >
            {name}
          </p>
          <p
            title={description ?? undefined}
            className="text-sub-info text-sm font-normal line-clamp-3"
          >
            {description}
          </p>
          <UserPreview
            userId={owner.id}
            trigger={
              <button>
                <p
                  title={owner.name}
                  className="text-sub-info text-xs font-semibold self-end line-clamp-1"
                >
                  {owner.name}
                </p>
              </button>
            }
          />
        </Link>
      ))}
    </section>
  );
};
