'use client';
import * as RadixTab from '@radix-ui/react-tabs';
import type { FC, ReactNode } from 'react';

export interface TabsProps {
  children: React.ReactNode;
  tabs: Array<{ id: string; label: ReactNode }>;
  rootClassName?: string;
  listContainerClassName?: string;
}

export const TabContent = RadixTab.Content;

export const Tabs: FC<TabsProps> = ({
  children,
  tabs,
  rootClassName = '',
  listContainerClassName = '',
}) => (
  <RadixTab.Root
    className={`flex flex-col h-full w-full ${rootClassName}`}
    defaultValue={tabs.at(0)?.id}
  >
    <RadixTab.List
      className={`flex mb-2 border-b-2 border-secondary-dark w-full ${listContainerClassName}`}
      aria-label="Tab"
    >
      {tabs.map(({ id, label }) => (
        <RadixTab.Trigger
          key={id}
          value={id}
          className="text-light px-3 h-[45px] flex items-center justify-center text-[15px] first:rounded-tl-md last:rounded-tr-md leading-none select-none hover:text-secondary data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative outline-none cursor-pointer"
        >
          {label}
        </RadixTab.Trigger>
      ))}
    </RadixTab.List>
    {children}
  </RadixTab.Root>
);
