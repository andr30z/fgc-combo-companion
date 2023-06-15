import { IconType } from 'react-icons';

interface SettingsItemProps {
  text?: React.ReactNode;
  icon?: IconType;
  textColor?: string;
  onClick: () => void;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  text,
  textColor = 'text-light',
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      title={typeof text === 'string' ? text : undefined}
      role="button"
      className="cursor-pointer hover:bg-opacity-30 flex flex-row justify-start items-center w-full p-4 rounded-xl bg-secondary-dark h-[76px]"
    >
      {Icon && (
        <Icon
          size={25}
          className={`mr-2 min-h-[25px] min-w-[25px] ${textColor}`}
        />
      )}
      <p className={`${textColor} text-lg font-primary font-semibold truncate`}>
        {text}
      </p>
    </div>
  );
};
