import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { PropsWithChildren } from 'react';
import Header from '@/components/layout/Header/Header';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import GlobalPortal from '@/GlobalPortal';
import GlobalProvider from '@/providers/GlobalProvider';
import ThemeLayout from '@/components/layout/ThemeLayout';

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
          <GlobalProvider>
            <ThemeLayout>
              <Header />
              <Sidebar />
              <Layout>{children}</Layout>
            </ThemeLayout>
          </GlobalProvider>
        </GlobalPortal>
      </body>
    </html>
  );
}

const Layout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-home overflow-x-auto">{children}</div>;
};
