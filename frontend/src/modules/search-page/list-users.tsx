import { Link } from '@/common/components/link';
import type { User } from '@/common/types/user';
import type { FC } from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaYoutubeSquare } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';

interface ListUsersProps {
  users: Array<User>;
}

export const ListUsers: FC<ListUsersProps> = ({ users }) => {
  const onClickSocials =
    (url: string) => (e: React.MouseEvent<SVGElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(url, '_blank');
    };
  return (
    <section className="flex-1 flex flex-col gap-2">
      <h6 className="font-bold text-light text-3xl">Users</h6>
      {users.map(
        ({
          name,
          instagramProfileUrl,
          twitterProfileUrl,
          youtubeChannelUrl,
          id,
        }) => (
          <Link
            key={id}
            href={`/user/${id}`}
            className="rounded-lg flex flex-col gap-2 w-full px-4 py-3 bg-secondary-dark hover:bg-opacity-50"
          >
            <p className="text-light text-lg font-semibold line-clamp-3">
              {name}
            </p>
            <div className="flex flex-row gap-2 justify-end w-full">
              {twitterProfileUrl && (
                <span>
                  <AiOutlineTwitter
                    onClick={onClickSocials(twitterProfileUrl)}
                    className="text-light font-primary hover:text-secondary cursor-pointer"
                    title="Go to Twitter"
                    size={25}
                  />
                </span>
              )}
              {instagramProfileUrl && (
                <FiInstagram
                  size={25}
                  title="Go to Instagram"
                  onClick={onClickSocials(instagramProfileUrl)}
                  className="text-light font-primary hover:text-secondary cursor-pointer"
                />
              )}
              {youtubeChannelUrl && (
                <FaYoutubeSquare
                  size={27}
                  title="Go to Youtube"
                  onClick={onClickSocials(youtubeChannelUrl)}
                  className="text-light font-primary hover:text-secondary cursor-pointer"
                />
              )}
            </div>
          </Link>
        ),
      )}
    </section>
  );
};
