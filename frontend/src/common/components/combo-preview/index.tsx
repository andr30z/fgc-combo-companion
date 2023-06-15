import { useBoolean } from '@/common/hooks/boolean';
import { Modal } from '../modal';
import { ComboTranslation } from '../combo-translation';
import type { FC, ReactNode } from 'react';
import { GameTypes } from '@/common/types/game-types';
export const ComboPreview: FC<{
  combo: string;
  description?: string;
  game: GameTypes;
  children: (openComboDetails: () => void) => ReactNode;
}> = ({ combo, description, game, children: renderTrigger }) => {
  const [
    isComboDetailsOpen,
    { setTrue: openComboDetails, setFalse: closeComboDetails },
  ] = useBoolean();
  return (
    <>
      <Modal
        title="Combo Preview"
        isOpen={isComboDetailsOpen}
        onClose={closeComboDetails}
        width="xl"
      >
        <ComboTranslation
          combo={combo}
          game={game}
          backgroundColor="secondary"
          className="mt-5 justify-center"
        />
        {combo && (
          <p className="break-words text-xl text-center text-light mt-5">
            {combo}
          </p>
        )}
        {description && (
          <p className="break-words text-xl text-center text-light mt-5">
            {description}
          </p>
        )}
      </Modal>
      {renderTrigger(openComboDetails)}
    </>
  );
};
