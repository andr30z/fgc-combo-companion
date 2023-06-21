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
                <a
                  href={twitterProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-light font-primary hover:text-secondary cursor-pointer"
                >
                  <AiOutlineTwitter title="Go to Twitter" size={25} />
                </a>
              )}
              {instagramProfileUrl && (
                <a
                  href={instagramProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-light font-primary hover:text-secondary cursor-pointer"
                >
                  <FiInstagram size={25} title="Go to Instagram" />
                </a>
              )}
              {youtubeChannelUrl && (
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-light font-primary hover:text-secondary cursor-pointer"
                >
                  <FaYoutubeSquare size={27} title="Go to Youtube" />
                </a>
              )}
            </div>
          </Link>
        ),
      )}
    </section>
  );
};
