import { getCharacterName } from '@/common/constants/game-characters';
import { useBoolean } from '@/common/hooks/boolean';
import { GameTypes } from '@/common/types/game-types';
import type { FC, ReactNode } from 'react';
import { BsFillShareFill } from 'react-icons/bs';
import { ComboTranslation, ComboTranslationProps } from '../combo-translation';
import { CopyTextButton } from '../copy-text-button';
import { Modal } from '../modal';
export const ComboPreview: FC<
  {
    combo: string;
    description?: string;
    game: GameTypes;
    comboId?: string;
    character?: string | null;
    totalDamage?: string | null;
    children: (openComboDetails: () => void) => ReactNode;
  } & Pick<ComboTranslationProps, 'htmlProps'>
> = ({
  combo,
  description,
  game,
  children: renderTrigger,
  htmlProps,
  comboId,
  character,
  totalDamage,
}) => {
  const [
    isComboDetailsOpen,
    { setTrue: openComboDetails, setFalse: closeComboDetails },
  ] = useBoolean();

  const damageAndCharacter =
    totalDamage || character ? (
      <span className="text-light font-primary text-lg mt-[1px]">
        {character ? getCharacterName(game, character) : ''}
        {totalDamage ? ` ${character ? '-' : ''} ${totalDamage} Damage` : null}
      </span>
    ) : null;
  return (
    <>
      <Modal
        title="Combo Preview"
        isOpen={isComboDetailsOpen}
        onClose={closeComboDetails}
        width="xl"
      >
        {damageAndCharacter}
        <ComboTranslation
          combo={combo}
          game={game}
          backgroundColor="secondary"
          className="mt-5 justify-center"
          htmlProps={htmlProps}
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
        {comboId && (
          <div className="w-full flex items-center justify-center mt-5">
            <CopyTextButton
              buttonIcon={<BsFillShareFill size={15} />}
              textToCopy={`/combo/${comboId}`}
              isAppUrlCopy
              text="Share"
            />
          </div>
        )}
      </Modal>
      {renderTrigger(openComboDetails)}
    </>
  );
};
