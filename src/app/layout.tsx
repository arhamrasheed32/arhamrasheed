import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AR | Arham Rasheed",
  description: "Portfolio of Arham Rasheed — Computer Science Engineer specializing in AI, ML, and Full-Stack Development.",
};

import { AudioPlayer } from "@/components/AudioPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[#020305] font-sans antialiased cursor-none overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <AudioPlayer />
        </ThemeProvider>
      </body>
    </html>
  );
}
