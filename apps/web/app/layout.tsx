import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TrpcPingBadge } from "@/components/trpc-ping-badge";
import { TRPCProvider } from "@/lib/trpc/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CMRT",
  description: "CAD model review tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="
          flex
          h-dvh
          flex-col
          overflow-hidden
        "
      >
        <TRPCProvider>
          <div
            className="
              flex
              min-h-0
              flex-1
              flex-col
              bg-zinc-50
              dark:bg-black
            "
          >
            <header
              className="
                flex
                shrink-0
                items-center
                justify-between
                border-b
                border-zinc-200
                px-6
                py-4
              "
            >
              <h1
                className="
                  text-xl
                  font-semibold
                  text-black
                  dark:text-zinc-50
                "
              >
                CADchat
              </h1>
              <TrpcPingBadge />
            </header>
            <main
              className="
                relative
                min-h-0
                flex-1
              "
            >
              {children}
            </main>
          </div>
        </TRPCProvider>
      </body>
    </html>
  );
}
