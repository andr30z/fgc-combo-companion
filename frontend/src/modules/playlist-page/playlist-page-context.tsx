'use client';
import { useBoolean } from '@/common/hooks/boolean';
import { createContext, PropsWithChildren, useContext } from 'react';

interface PlaylistPageContextInterface {
  showPlaylistPageMobileSideBar: boolean;
  togglePlaylistPageMobileSideBar: () => void;
}

const Provider = createContext<PlaylistPageContextInterface>(
  {} as PlaylistPageContextInterface,
);

export const PlaylistPageProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [
    showPlaylistPageMobileSideBar,
    { toggle: togglePlaylistPageMobileSideBar },
  ] = useBoolean();
  return (
    <Provider.Provider
      value={{
        showPlaylistPageMobileSideBar,
        togglePlaylistPageMobileSideBar,
      }}
    >
      {children}
    </Provider.Provider>
  );
};
export function usePlaylistPage() {
  return useContext(Provider);
}
