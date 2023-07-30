import { AddComboToPlaylist } from '@/common/components/add-combo-to-playlist';
import { ComboPreview } from '@/common/components/combo-preview';
import { ComboTranslation } from '@/common/components/combo-translation';
import type { Combo } from '@/common/types/combo';
import type { FC } from 'react';
interface ListCombosProps {
  combos: Array<Combo>;
}

export const ListCombos: FC<ListCombosProps> = ({ combos }) => {
  return (
    <section className="flex flex-col gap-2 layout-padding-x">
      <h6 className="font-bold text-light text-3xl">Combos</h6>
      {combos.map(({ combo, game, name, id, description }) => (
        <ComboPreview
          key={id}
          combo={combo}
          game={game}
          description={description}
          comboId={id}
        >
          {(openPreview) => (
            <ComboTranslation
              onClick={openPreview}
              combo={combo}
              game={game}
              rendeHeader={() => (
                <div className="flex flex-row items-center justify-between w-full mb-2">
                  <h6 className="text-light font-bold text-lg">{name}</h6>

                  <AddComboToPlaylist comboId={id} />
                </div>
              )}
              backgroundColor="secondary-dark"
              className="cursor-pointer hover:bg-opacity-40"
            />
          )}
        </ComboPreview>
      ))}
    </section>
  );
};
