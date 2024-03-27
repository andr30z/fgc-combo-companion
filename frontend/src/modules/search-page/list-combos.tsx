import { AddComboToPlaylist } from '@/common/components/add-combo-to-playlist';
import { ComboPreview } from '@/common/components/combo-preview';
import { ComboTranslation } from '@/common/components/combo-translation';
import { UserPreviewLink } from '@/common/components/user-preview-link';
import { getCharacterName } from '@/common/constants/game-characters';
import type { Combo } from '@/common/types/combo';
import { formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { FC } from 'react';
interface ListCombosProps {
  combos: Array<Combo>;
}

export const ListCombos: FC<ListCombosProps> = ({ combos }) => {
  const getDate = (date: string) => formatRelative(new Date(date), new Date());
  return (
    <section className="flex flex-col gap-2 layout-padding-x">
      <h6 className="font-bold text-light text-3xl">Combos</h6>
      {combos.map(
        ({
          combo,
          game,
          name,
          id,
          description,
          character,
          totalDamage,
          owner: { name: ownerName, id: ownerId },
          createdAt,
        }) => (
          <ComboPreview
            key={id}
            combo={combo}
            game={game}
            description={description}
            comboId={id}
            character={character}
            totalDamage={totalDamage}
          >
            {(openPreview) => (
              <ComboTranslation
                onClick={openPreview}
                combo={combo}
                game={game}
                rendeHeader={() => (
                  <header className="flex flex-row items-center justify-between w-full mb-2">
                    <div className="font-bold w-full">
                      <h6
                        title={name}
                        className="text-light text-lg line-clamp-2"
                      >
                        {name}
                      </h6>
                      <span className="text-sub-info font-primary text-sm text-left">
                        <UserPreviewLink
                          id={ownerId}
                          name={ownerName}
                          prefix="Created by"
                          sufix={
                            <span className="text-sub-info font-normal">
                              {' - '} {getDate(createdAt)}
                            </span>
                          }
                        />
                        {totalDamage || character ? (
                          <>
                            {character ? getCharacterName(game, character) : ''}
                            {totalDamage
                              ? ` ${character ? '-' : ''} ${totalDamage} Damage`
                              : null}
                          </>
                        ) : null}
                      </span>
                    </div>
                    <aside className="flex flex-row gap-2 items-center">
                      <AddComboToPlaylist comboId={id} />
                    </aside>
                  </header>
                )}
                backgroundColor="secondary-dark"
                className="cursor-pointer hover:bg-opacity-40"
              />
            )}
          </ComboPreview>
        ),
      )}
    </section>
  );
};
