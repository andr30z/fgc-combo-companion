'use client';
import { RiDownloadLine } from 'react-icons/ri';
import { Button, ButtonProps } from '../button';

import { toPng } from 'html-to-image';
interface DownloadComponentImageProps<ComponentType extends HTMLElement>
  extends Omit<ButtonProps, 'onClick'> {
  imageName?: string;
  componentRef: React.RefObject<ComponentType>;
}

export const DownloadComponentImageButton = <
  ComponentType extends HTMLElement,
>({
  componentRef,
  imageName = 'image.png',
  ...buttonProps
}: DownloadComponentImageProps<ComponentType>) => {
  const handleDownloadImage = async () => {
    const element = componentRef.current;

    if (!element) {
      return;
    }

    const data = await toPng(element, {
      //if I dont add this, it won't work correctly
      includeQueryParams: true,
    });

    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = imageName;

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
