import { useBoolean } from '@/common/hooks/boolean';
import { Modal } from '../modal';
import { ComboTranslation, ComboTranslationProps } from '../combo-translation';
import type { FC, ReactNode } from 'react';
import { GameTypes } from '@/common/types/game-types';
import { Button } from '../button';
import { BsFillShareFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { getCharacterName } from '@/common/constants/game-characters';
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
      <span className="text-light font-primary text-sm mt-[1px]">
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
            <Button
              color="primary"
              leftIcon={<BsFillShareFill size={15} />}
              text="Share"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${
                    process.env.NODE_ENV === 'production'
                      ? 'https://app.fgc-combo-companion.xyz'
                      : 'http://localhost:3000'
                  }/combo/${comboId}`,
                );
                toast.success('The share link was copied to the clipboard');
              }}
            />
          </div>
        )}
      </Modal>
      {renderTrigger(openComboDetails)}
    </>
  );
};
