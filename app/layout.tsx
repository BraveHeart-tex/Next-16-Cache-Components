import "./globals.css";
import type { Metadata } from "next";
import { Navigation } from "./Navigation";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Next.js 16 Caching Playground",
  description: "A playground for learning Next.js 16 caching concepts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-background text-foreground antialiased max-w-5xl mx-auto px-6 py-10">
        <header className="mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">
              Next.js 16 Caching Playground
            </h1>
            <span className="text-xs text-muted-foreground font-mono">
              next@16 · react@19
            </span>
          </div>
          <Navigation />
          <Separator className="mt-6" />
        </header>

        <main>{children}</main>

        <footer className="mt-16 pt-6">
          <Separator className="mb-6" />
          <p className="text-xs text-center text-muted-foreground">
            Rendered timestamps prove caching — refresh to see the difference
          </p>
        </footer>
      </body>
    </html>
  );
}
