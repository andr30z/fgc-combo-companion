'use client';
import { ComboListItems } from '@/common/components/combo-list-items';
import { Pagination } from '@/common/components/pagination';
import { TabContent } from '@/common/components/tabs';
import { usePaginatedSearch } from '@/common/hooks/paginated-search';
import { FGC_API_URLS } from '@/common/services/fgc-api';
import { Combo } from '@/common/types/combo';
import { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';

interface UserCombosProps {
  initialComboData?: FGCApiPaginationResponse<Combo> | null;
  userId?: string;
}
export const UserCombos: React.FC<UserCombosProps> = ({
  initialComboData,
  userId,
}) => {
  const { data: combosData, onSelectPage } = usePaginatedSearch<Combo>({
    queryKey: ['user-details-combo', userId],
    url: FGC_API_URLS.USER_COMBOS + '/' + userId,
    initialData: initialComboData as FGCApiPaginationResponse<Combo>,
    enabled: !!userId,
    pageSize: 10,
  });
  return (
    <TabContent
      className="w-full layout-padding-x flex flex-col items-center justify-center"
      value="combos"
    >
      <ComboListItems
        items={combosData?.data ?? []}
        emptyListMessage="This user doesn't have any combos yet."
        useCreateComboButtonWhenEmpty={false}
      />
      {combosData && (
        <div className="mt-5 w-full">
          <Pagination
            onSelectPage={onSelectPage}
            pagination={combosData}
            showTotal
          />
        </div>
      )}
    </TabContent>
  );
};
