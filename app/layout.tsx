import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { type PropsWithChildren } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My Custom Calendar",
  description: "파프롬지니어스 캘린더",
  keywords: ["calendar", "custom", "farfromgenius"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

const Layout = ({children} : PropsWithChildren) => {
  return (
    <div className="">
      {children}
    </div>
  )
}