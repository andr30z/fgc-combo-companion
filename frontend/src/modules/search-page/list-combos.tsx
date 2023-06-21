import { ComboPreview } from '@/common/components/combo-preview';
import { ComboTranslation } from '@/common/components/combo-translation';
import { Combo } from '@/common/types/combo';
import { FC } from 'react';
import { MdPlaylistAdd } from 'react-icons/md';
interface ListCombosProps {
  combos: Array<Combo>;
}

export const ListCombos: FC<ListCombosProps> = ({ combos }) => {
  return (
    <section className="flex-1 flex flex-col gap-2 layout-padding-x">
      <h6 className="font-bold text-light text-3xl">Combos</h6>
      {combos.map(({ combo, game, name, id, description }) => (
        <ComboPreview
          key={id}
          combo={combo}
          game={game}
          description={description}
        >
          {(openPreview) => (
            <ComboTranslation
              onClick={openPreview}
              combo={combo}
              game={game}
              rendeHeader={() => (
                <div className="flex flex-row items-center justify-between w-full mb-2">
                  <h6 className="text-light font-bold text-lg">{name}</h6>
                  <MdPlaylistAdd
                    role="button"
                    className="text-light hover:text-opacity-30 select-none"
                    size={30}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
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
