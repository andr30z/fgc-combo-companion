import { startTransition, useRef } from 'react';
import { IoMdColorPalette } from 'react-icons/io';
import { Button } from '../button';

interface ColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  title?: string;
  buttonText?: string;
}
export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  setColor,
  title,
  buttonText,
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        style={{
          backgroundColor: color,
        }}
        useHoverStyles={false}
        leftIcon={<IoMdColorPalette size={18} />}
        title={title}
        text={buttonText}
        extraStyles="hover:opacity-50"
        onClick={() => {
          if (colorInputRef.current) {
            colorInputRef.current.click();
          }
        }}
      />
      <input
        ref={colorInputRef}
        value={color}
        type="color"
        className="opacity-0 cursor-pointer absolute"
        onChange={(e) => {
          e.stopPropagation();
          const value = e.currentTarget.value;
          startTransition(() => {
            setColor(value);
          });
        }}
      />
    </>
  );
};
