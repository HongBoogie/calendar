import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { PropsWithChildren } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import GlobalPortal from '@/GlobalPortal';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'My Calendar',
  description: 'A simple calendar app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlobalPortal>
          <Header />
          <Sidebar />
          <Layout>{children}</Layout>
        </GlobalPortal>
      </body>
    </html>
  );
}

const Layout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-home min-w-layout pl-40">{children}</div>;
};
