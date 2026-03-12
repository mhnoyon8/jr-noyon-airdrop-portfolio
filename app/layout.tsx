import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Jr Noyon — Strategic Crypto Airdrop Hunter',
  description: 'Professional portfolio of Jr Noyon, a crypto airdrop hunter focused on strategic participation and risk-managed execution.',
  openGraph: {
    title: 'Jr Noyon — Strategic Crypto Airdrop Hunter',
    description: 'Identifying high-potential airdrops before they drop.',
    type: 'website'
  },
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} ${mono.variable} font-sans text-textPrimary`}>{children}</body>
    </html>
  );
}
