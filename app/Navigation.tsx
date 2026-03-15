"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/01-no-cache", label: "No cache", num: "01" },
  { href: "/02-use-cache-page", label: "Page cache", num: "02" },
  { href: "/03-use-cache-component", label: "Component cache", num: "03" },
  { href: "/04-use-cache-function", label: "Function cache", num: "04" },
  { href: "/05-cache-life", label: "Cache life", num: "05" },
  { href: "/06-cache-tags", label: "Cache tags", num: "06" },
  { href: "/07-ppr-suspense", label: "PPR + Suspense", num: "07" },
  { href: "/08-suspense", label: "Suspense deep dive", num: "08" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1.5 mt-6">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {link.num && (
              <Badge
                variant={isActive ? "secondary" : "outline"}
                className="font-mono text-xs px-1.5 h-4 rounded-sm"
              >
                {link.num}
              </Badge>
            )}
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
