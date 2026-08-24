import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Timesquares.lol — Own the Biggest Billboard on the Internet',
  description: 'Bid your way up the square. The bigger the bid, the bigger the billboard.',
  openGraph: { title: 'TIMESQUARES.LOL', description: 'Own the biggest billboard on the internet.', images: ['/og.png'] },
  twitter: { card: 'summary_large_image', title: 'TIMESQUARES.LOL', description: 'Own the biggest billboard on the internet.', images: ['/og.png'] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
