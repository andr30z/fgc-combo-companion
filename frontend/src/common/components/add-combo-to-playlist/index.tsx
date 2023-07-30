'use client';

import { useAddCombosToPlaylist } from '@/common/hooks/add-combos-to-playlist';
import { useBoolean } from '@/common/hooks/boolean';
import { useMyPlaylists } from '@/common/hooks/my-playlists';
import * as Select from '@radix-ui/react-select';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdPlaylistAdd } from 'react-icons/md';
import { useInView } from 'react-intersection-observer';

interface AddComboToPlaylistProps {
  comboId: string;
  iconSize?: number;
}

export const AddComboToPlaylist: React.FC<AddComboToPlaylistProps> = ({
  comboId,
  iconSize = 30,
}) => {
  const [enabled, { setValue }] = useBoolean();
  const { allPlaylists, fetchNextPage } = useMyPlaylists({ enabled });
  const [ref] = useInView({
    onChange(inView) {
      if (inView) {
        fetchNextPage();
      }
    },
  });

  const mutation = useAddCombosToPlaylist();

  return (
    <Select.Root onOpenChange={setValue}>
      <Select.Trigger>
        <Select.Value>
          <MdPlaylistAdd
            title="Add combo to playlist"
            className="outline-none text-light hover:text-opacity-30 select-none pointer-events-auto"
            size={iconSize}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </Select.Value>
        {/* </Select.Value> */}
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          onClick={(e) => e.stopPropagation()}
          className="overflow-y-hidden min-h-[100px] w-[140px] bg-secondary-dark shadow-sm shadow-light-active"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-light  cursor-default">
            <FaChevronUp size={23} />
          </Select.ScrollUpButton>
          <Select.Viewport>
            {allPlaylists.map((playlist) => (
              <Select.Item
                key={playlist.id}
                title={playlist.name}
                className="outline-none border-none rounded-[3px] flex items-center h-[25px] w-full select-none text-light hover:bg-light hover:text-secondary-dark px-1 line-clamp-1"
                value={playlist.id.toString()}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  mutation.mutate({
                    playlistId: playlist.id,
                    combos: [comboId],
                  });
                }}
              >
                <Select.ItemText className="w-full">
                  {playlist.name}
                </Select.ItemText>
              </Select.Item>
            ))}
            <span ref={ref} />
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-light  cursor-default">
            <FaChevronDown size={23} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
