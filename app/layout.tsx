import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Modern Storytelling Toolkit / vvd",
  description: "Create, organize, and share your worlds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-[#0a0a0a] text-[#fafafa] flex h-screen overflow-hidden`}>
        {/* Grain effect */}
        <div className="fixed inset-0 pointer-events-none opacity-20 z-50" style={{ backgroundImage: 'url("/textures/noise.svg")' }}></div>
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
          <TopNav />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
