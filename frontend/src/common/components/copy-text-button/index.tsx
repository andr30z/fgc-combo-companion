'use client';
import { toast } from 'react-hot-toast';
import { AiOutlineCopy } from 'react-icons/ai';
import { Button, ButtonProps } from '../button';
interface CopyTextButtonProps extends Partial<ButtonProps> {
  textToCopy: string;
  isAppUrlCopy?: boolean;
  buttonIcon?: React.ReactNode;
}

export const CopyTextButton: React.FC<CopyTextButtonProps> = ({
  textToCopy,
  isAppUrlCopy = false,
  buttonIcon = <AiOutlineCopy size={17} />,
  ...btnProps
}) => {
  const getCopyText = () => {
    if (!isAppUrlCopy) {
      return textToCopy;
    }
    return `${
      process.env.NODE_ENV === 'production'
        ? 'https://app.fgc-combo-companion.xyz'
        : 'http://localhost:3000'
    }${textToCopy}`;
  };
  // console.log("dsadsad")
  return (
    <Button
      color="primary"
      leftIcon={buttonIcon}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const element = document.createElement('textarea');
        element.value = getCopyText();
        e.currentTarget.appendChild(element);
        element.select();
        element.focus();
        document.execCommand('copy');
        element.blur();
        e.currentTarget.removeChild(element);
        navigator?.clipboard?.writeText(getCopyText());
        toast.success('The share link was copied to the clipboard');
      }}
      {...btnProps}
    />
  );
};
