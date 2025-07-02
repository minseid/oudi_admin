"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    // 로그인 페이지가 아닌데 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    if (!isLoginPage) {
      const currentAdmin = localStorage.getItem('currentAdmin');
      if (!currentAdmin) {
        router.replace('/login');
      }
    }
  }, [isLoginPage, router]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen">
          {!isLoginPage && <Navigation />}
          <main className={`flex-1 ${!isLoginPage ? 'lg:ml-64 bg-gray-50 p-4' : ''}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
