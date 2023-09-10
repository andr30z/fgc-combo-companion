'use client';
import { RiDownloadLine } from 'react-icons/ri';
import { Button, ButtonProps } from '../button';

import { toPng } from 'html-to-image';
interface DownloadComponentImageProps<ComponentType extends HTMLElement>
  extends Omit<ButtonProps, 'onClick'> {
  componentRef: React.RefObject<ComponentType>;
}

export const DownloadComponentImage = <ComponentType extends HTMLElement>({
  componentRef,
  ...buttonProps
}: DownloadComponentImageProps<ComponentType>) => {
  const handleDownloadImage = async () => {
    const element = componentRef.current;

    if (!element) {
      return;
    }

    const data = await toPng(element);

    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <Button
      {...buttonProps}
      onClick={handleDownloadImage}
      leftIcon={<RiDownloadLine size={20} />}
    />
  );
};
