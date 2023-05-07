import * as Dialog from '@radix-ui/react-dialog';
import { memo } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
interface ModalProps {
  children: React.ReactNode;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  width?: 'xl' | 'lg' | 'md' | 'sm';
}
const widths = {
  xl: 'w-[90vw]',
  lg: 'w-[70vw]',
  md: 'w-[80vw] md:w-[50vw]',
  sm: 'w-[50vw] md:w-[30vw]',
};

export const Modal = memo<ModalProps>(
  ({ children, title, isOpen, onClose, width = 'md' }) => {
    const selectedSize = widths[width];
    return (
      <Dialog.Root modal open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="bg-black bg-opacity-70 data-[state=open]:animate-overlayShow fixed inset-0"
          />
          <Dialog.Content
            className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[95vh] ${selectedSize} max-w-[100vw] sm:max-w-[95vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] py-0 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] bg-dark border-secondary-dark border-2 focus:outline-none overflow-auto`}
          >
            <header className="mb-3 sticky z-50 top-0 w-full bg-dark flex flex-row items-center justify-between h-[70px] border-b-2 px-6 border-secondary-dark">
              {title && (
                <Dialog.Title className="text-light m-0 text-xl font-bold font-primary">
                  {title}
                </Dialog.Title>
              )}
              <Dialog.Close
                asChild
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <button
                  className="text-light bg-dark hover:bg-primary hover:text-light border-1 inline-flex h-[30px] w-[30px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <AiOutlineClose size={18} />
                </button>
              </Dialog.Close>
            </header>
            <div className="px-6 w-full h-[90%]">{children}</div>
            <div className="w-full h-[20px] bg-dark sticky bottom-[-0.9px] mt-2" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);
