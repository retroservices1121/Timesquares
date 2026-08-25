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
      <head>
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY&&<script defer crossOrigin="anonymous" data-clerk-publishable-key={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} src="https://cdn.jsdelivr.net/npm/@clerk/clerk-js@6/dist/clerk.browser.js"/>}
        {process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID&&<script defer data-website-id={process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID} data-domain={process.env.NEXT_PUBLIC_DATAFAST_DOMAIN||'timesquares.lol'} data-disable-console="true" src="https://datafa.st/js/script.js"/>}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
