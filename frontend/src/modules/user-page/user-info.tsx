'use client';
import { Link } from '@/common/components/link';
import { useApiQuery } from '@/common/hooks/api-query';
import { usePageTitle } from '@/common/hooks/page-title';
import { useUser } from '@/common/hooks/user';
import { User } from '@/common/types/user';
import { AiFillEdit, AiOutlineTwitter } from 'react-icons/ai';
import { FaYoutubeSquare } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';

const TEN_MINUTES = 1000 * 60 * 10;

interface UserInfoProps {
  user?: User | null;
}
export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { user: currentUser } = useUser();
  const { data } = useApiQuery<User>({
    apiConfig: { url: `/users/${user?.id}` },
    initialData: user,
    key: ['user-details', user?.id],
    staleTime: TEN_MINUTES,
  });
  usePageTitle(`${data?.name} - FGC`);
  const hasNoSocialMediaLinks =
    !user?.twitterProfileUrl &&
    !user?.youtubeChannelUrl &&
    !user?.instagramProfileUrl;
  return (
    <header className="flex flex-col w-full layout-padding-x gap-2">
      <h1 className="text-light font-primary text-3xl font-bold">
        {data?.name}
      </h1>

      {data?.bio && (
        <p className="text-light font-primary text-left">{data.bio}</p>
      )}

      {!hasNoSocialMediaLinks && (
        <div className="flex flex-row justify-end gap-1">
          {user?.id === currentUser?.id && (
            <Link href="/user/profile" color="light">
              <AiFillEdit title="Edit" size={25} />
            </Link>
          )}
          {data?.twitterProfileUrl && (
            <a
              href={user?.twitterProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-light font-primary hover:text-secondary cursor-pointer"
            >
              <AiOutlineTwitter title="Go to Twitter" size={25} />
            </a>
          )}
          {data?.instagramProfileUrl && (
            <a
              href={user?.instagramProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-light font-primary hover:text-secondary cursor-pointer"
            >
              <FiInstagram size={25} title="Go to Instagram" />
            </a>
          )}
          {data?.youtubeChannelUrl && (
            <a
              href={user?.youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="text-light font-primary hover:text-secondary cursor-pointer"
            >
              <FaYoutubeSquare size={27} title="Go to Youtube" />
            </a>
          )}
        </div>
      )}
    </header>
  );
};
