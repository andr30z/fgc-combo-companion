'use client';
import { useUser } from '@/common/hooks/user';
import { Link } from '../link';
import { UserPreview } from '../user-preview';

export const UserPreviewLink: React.FC<{
  name: string;
  id: string;
  prefix?: string;
}> = ({ id, name, prefix }) => {
  const { user } = useUser({ redirectTo: null });
  const currentUserIsOwner = user?.id === id;
  return (
    <UserPreview
      userId={id}
      trigger={
        <button title={name}>
          <Link
            href={`/user/${id}`}
            useHoverStyles={false}
            onClick={(e) => e.stopPropagation()}
            className="text-ellipsis truncate text-sub-info font-primary text-sm mt-[1px] hover:decoration-sub-info hover:underline"
          >
            {prefix} {currentUserIsOwner ? <strong>you</strong> : name}
          </Link>
        </button>
      }
    />
  );
};
