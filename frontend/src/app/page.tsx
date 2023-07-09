import { PresentationButtons } from '@/modules/lading-page/presentation-buttons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FGC Combo Companion',
  description:
    'The best way to store and share knowledge about combos in fighting games.',
  twitter: {
    title: 'FGC Combo Companion',
    description:
      'The best way to store and share knowledge about combos in fighting games.',
    site: 'https://app.fgc-combo-companion.xyz',
    images: '/metatag-logo.png',
    card: 'summary',
  },
  openGraph: {
    type: 'website',
    title: 'FGC Combo Companion',
    description:
      'The best way to store and share knowledge about combos in fighting games.',
    url: 'https://app.fgc-combo-companion.xyz',
    images: '/metatag-logo.png',
    siteName: 'FGC Combo Companion',
  },
};

export default function Home() {
  return (
    <main className="px-10 sm:px20 min-h-400 h-80vh flex flex-col justify-center items-center gap-5 font-primary relative">
      <h1 className="z-10 items-center flex flex-row gap-2 text-light text-2xl sm:text-5xl font-primary font-black px-10">
        Translate.
        <span className="font-primary font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Create.
        </span>
        Share.
      </h1>

      <p className="z-10  text-white text-lg text-center px-10">
        Combo Companion is an open source project made for the{' '}
        <span className="font-semibold text-xl text-secondary">
          Fighting Game Community
        </span>{' '}
        to store and share knowledge about combos in fighting games.
      </p>
      <PresentationButtons />
      <div className="rounded-full absolute self-auto inset-auto bg-secondary w-full h-1/2 sm:w-2/5 blur-3xl drop-shadow-2xl opacity-20 z-0" />
    </main>
  );
}
