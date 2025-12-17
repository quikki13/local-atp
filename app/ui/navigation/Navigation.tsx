"use client";

import { TabNav } from "@radix-ui/themes";
import { usePathname } from 'next/navigation';

import { URLS } from '@/app/consts/common';

export const Navigation = () => {
  const path = usePathname();

  return (
    <div className='flex flex-col w-full'>
      <TabNav.Root color='blue'>
        <TabNav.Link href={URLS.main} active={path === URLS.main}>
          Home
        </TabNav.Link>
        <TabNav.Link href={URLS.tours} active={path === URLS.tours}>Tours</TabNav.Link>
        <TabNav.Link href={URLS.seasons} active={path === URLS.seasons}>Seasons</TabNav.Link>
        <TabNav.Link href={URLS.players} active={path === URLS.players}>Players</TabNav.Link>
        <TabNav.Link href={URLS.add_games} active={path === URLS.add_games}>Add games</TabNav.Link>
      </TabNav.Root>
    </div>
  );
};
