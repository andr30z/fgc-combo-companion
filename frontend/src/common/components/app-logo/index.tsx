import Image from 'next/image';

export interface AppLogoProps {
  height?: number;
  width?: number;
  extraStyles?: string;
  onClick?: () => void;
}
export const AppLogo: React.FC<AppLogoProps> = ({
  height = 80,
  width = 80,
  extraStyles = '',
  onClick,
}) => {
  return (
    <Image
      onClick={onClick}
      priority
      className={extraStyles}
      src="/fists.svg"
      height={height}
      width={width}
      alt="FGC Combo Companion logo"
    />
  );
};
