import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { BASE_METADATA } from "@/constant";

import { I18nProvider } from "@/context/i18n.context";
import { StyleProvider } from "@/context/style.context";

import type { Metadata } from "next";

export const metadata: Metadata = { ...BASE_METADATA };

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <I18nProvider>
          <StyleProvider>
            <Header />
            <main id="main-container">{children}</main>
            <Footer />
          </StyleProvider>
        </I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
