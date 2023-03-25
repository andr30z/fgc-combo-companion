import Image from "next/image";

export interface AppLogoProps {
  height?: number;
  width?: number;
}
export const AppLogo: React.FC<AppLogoProps> = ({
  height = 150,
  width = 150,
}) => {
  return (
    <Image
      priority
      src="/fists.svg"
      height={height}
      width={width}
      alt="FGC Combo Companion logo"
    />
  );
};
