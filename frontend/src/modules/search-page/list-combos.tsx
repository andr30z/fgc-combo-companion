import { AddComboToPlaylist } from '@/common/components/add-combo-to-playlist';
import { ComboPreview } from '@/common/components/combo-preview';
import { ComboTranslation } from '@/common/components/combo-translation';
import { UserPreviewLink } from '@/common/components/user-preview-link';
import { useGetCharacters } from '@/common/hooks/get-characters';
import type { Combo } from '@/common/types/combo';
import { formatRelative } from 'date-fns';
import type { FC } from 'react';
interface ListCombosProps {
  combos: Array<Combo>;
}

const Header: FC<{ combo: Combo }> = ({ combo }) => {
  const {
    name,
    game,
    character,
    totalDamage,
    owner: { name: ownerName, id: ownerId },
    createdAt,
    id,
  } = combo;
  const { getCharacterName } = useGetCharacters({ game });
  const getDate = (date: string) => formatRelative(new Date(date), new Date());

  return (
    <header className="flex flex-row items-center justify-between w-full mb-2">
      <div className="font-bold w-[80%] md:w-[90%]">
        <h6 title={name} className="text-light text-lg line-clamp-2">
          {name}
        </h6>
        <div className="text-sub-info font-primary text-sm text-left">
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
            <span>
              {character ? getCharacterName(character) : ''}
              {totalDamage
                ? ` ${character ? '-' : ''} ${totalDamage} Damage`
                : null}
            </span>
          ) : null}
        </div>
      </div>
      <aside className="flex flex-row gap-2 items-center">
        <AddComboToPlaylist comboId={id} />
      </aside>
    </header>
  );
};

export const ListCombos: FC<ListCombosProps> = ({ combos }) => {
  return (
    <section className="flex flex-col gap-2 layout-padding-x">
      <h6 className="font-bold text-light text-3xl">Combos</h6>
      {combos.map((comboItem) => {
        const {
          id,
          name: combo,
          game,
          character,
          totalDamage,
          description,
        } = comboItem;
        return (
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
                rendeHeader={() => <Header combo={comboItem} />}
                backgroundColor="secondary-dark"
                className="cursor-pointer hover:bg-opacity-40"
              />
            )}
          </ComboPreview>
        );
      })}
    </section>
  );
};
