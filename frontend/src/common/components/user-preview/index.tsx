import { useApiQuery } from '@/common/hooks/api-query';
import { useBoolean } from '@/common/hooks/boolean';
import { FGC_API_URLS } from '@/common/services/fgc-api';
import { UserProfile } from '@/common/types/user-profile';
import * as Tooltip from '@radix-ui/react-tooltip';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaYoutubeSquare } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { Link } from '../link';
import { Skeleton } from '../skeleton';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <Skeleton rounded="lg" className="h-[15px] w-[30%]" />
      <div className="flex flex-col gap-2 w-full">
        <Skeleton rounded="lg" className="h-[13px] w-full" />
        <Skeleton rounded="lg" className="h-[13px] w-full" />
        <Skeleton rounded="lg" className="h-[13px] w-[80%]" />
      </div>

      <Skeleton rounded="lg" className="w-1/2 h-[15px]" />
    </div>
  );
};

interface UserPreviewProps {
  trigger: React.ReactNode;
  userId: string;
}
export const UserPreview: React.FC<UserPreviewProps> = ({
  trigger,
  userId,
}) => {
  const [isOpen, { setValue }] = useBoolean();

  const { data: userProfile, isLoading } = useApiQuery<UserProfile>({
    key: ['USER_PROFILE', userId, isOpen],
    apiConfig: {
      url: `${FGC_API_URLS.USER_PUBLIC_PROFILE}/${userId}`,
    },
    enabled: isOpen,
  });
  return (
    <div>
      <Tooltip.Provider>
        <Tooltip.Root onOpenChange={setValue} delayDuration={1000}>
          <Tooltip.Trigger asChild className={isOpen ? 'open' : 'closed'}>
            {trigger}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-dark shadow-sm rounded-md p-5 shadow-light w-[300px] flex flex-col justify-around gap-2"
              sideOffset={2}
              side="bottom"
            >
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <Link useHoverStyles={false} href={`/user/${userId}`}>
                    <h4 className="text-light font-primary text-lg font-semibold hover:underline line-clamp-2">
                      {userProfile?.user.name}
                    </h4>
                  </Link>

                  {userProfile?.user.bio && (
                    <p
                      className="text-light text-sm line-clamp-3"
                      title={userProfile?.user.bio}
                    >
                      {userProfile?.user.bio}
                    </p>
                  )}

                  <div className="flex flex-row flex-wrap gap-2 w-full text-light text-sm font-primary font-normal">
                    <p>
                      <strong>{userProfile?.playlists.totalItems}</strong>{' '}
                      Playlist
                      {userProfile?.playlists?.totalItems &&
                      userProfile?.playlists?.totalItems > 1
                        ? 's'
                        : ''}
                    </p>
                    <p>
                      <strong>{userProfile?.combos.totalItems}</strong> Combo
                      {userProfile?.combos?.totalItems &&
                      userProfile?.combos?.totalItems > 1
                        ? 's'
                        : ''}
                    </p>
                  </div>
                  <div className="flex flex-row flex-wrap w-full gap-2">
                    {userProfile?.user?.twitterProfileUrl && (
                      <a
                        href={userProfile?.user?.twitterProfileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-light font-primary hover:text-secondary cursor-pointer"
                      >
                        <AiOutlineTwitter title="Go to Twitter" size={25} />
                      </a>
                    )}
                    {userProfile?.user?.instagramProfileUrl && (
                      <a
                        href={userProfile?.user?.instagramProfileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-light font-primary hover:text-secondary cursor-pointer"
                      >
                        <FiInstagram size={25} title="Go to Instagram" />
                      </a>
                    )}
                    {userProfile?.user?.youtubeChannelUrl && (
                      <a
                        href={userProfile?.user?.youtubeChannelUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-light font-primary hover:text-secondary cursor-pointer"
                      >
                        <FaYoutubeSquare size={27} title="Go to Youtube" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};
