import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { I18nProvider } from "@/context/i18n.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <I18nProvider>
          <Header />
          <main id="main-container">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
