import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const openSans = localFont({
  src: [
    { path: '../public/assets/open-sans-regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/assets/open-sans.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Community in focus | Renaissance Innovation Labs',
  description: 'The people, ideas and moments of Renaissance Innovation Labs. Browse MIWS, Kids Summer Camp, KCC, and Hack and Chill.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body id="top" className={openSans.variable}>{children}</body></html>;
}
