import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const BADGE_VARIANTS: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  '"use cache"': "default",
  cacheLife: "secondary",
  cacheTag: "secondary",
  revalidateTag: "destructive",
  updateTag: "destructive",
  Suspense: "outline",
  PPR: "outline",
};

const DEMOS = [
  {
    path: "/01-no-cache",
    num: "01",
    title: "No cache — fully dynamic",
    desc: "Baseline implementation with no caching. Every request fetches fresh data and returns a new render timestamp.",
    badges: [],
  },
  {
    path: "/02-use-cache-page",
    num: "02",
    title: "Page-level cache",
    desc: 'The entire page route is cached and serves a frozen timestamp. The simplest possible use of "use cache".',
    badges: ['"use cache"', "cacheLife"],
  },
  {
    path: "/03-use-cache-component",
    num: "03",
    title: "Component-level cache",
    desc: "Dynamic page header reading cookies, combined with a statically cached product grid below it. Two render modes on the same page.",
    badges: ['"use cache"', "cacheLife", "cacheTag"],
  },
  {
    path: "/04-use-cache-function",
    num: "04",
    title: "Function-level cache",
    desc: "Dynamic page that fetches specific cached data fragments. Function arguments are automatically serialized into the cache key.",
    badges: ['"use cache"', "cacheLife", "cacheTag"],
  },
  {
    path: "/05-cache-life",
    num: "05",
    title: "Cache life profiles",
    desc: "Three components side-by-side with different stale, revalidate, and expire times. Refresh to watch them expire independently.",
    badges: ["cacheLife"],
  },
  {
    path: "/06-cache-tags",
    num: "06",
    title: "Cache tags & invalidation",
    desc: "Mutations via Server Actions showing the difference between stale-while-revalidate and immediate consistency.",
    badges: ["cacheTag", "revalidateTag", "updateTag"],
  },
  {
    path: "/07-ppr-suspense",
    num: "07",
    title: "PPR + Suspense streaming",
    desc: "A cached static shell with Suspense boundaries that stream dynamic content at request time. The synthesis of everything.",
    badges: ['"use cache"', "Suspense", "PPR"],
  },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Caching Demos</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Seven focused routes — each teaching one concept. Work through them in
          order.
        </p>
      </div>

      <Separator />

      <div className="grid gap-4">
        {DEMOS.map((demo) => (
          <Card
            key={demo.path}
            className="transition-colors hover:border-foreground/20"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md shrink-0">
                    {demo.num}
                  </span>
                  <div>
                    <CardTitle className="text-base leading-snug">
                      {demo.title}
                    </CardTitle>
                    <CardDescription className="font-mono text-xs mt-0.5">
                      {demo.path}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="shrink-0 gap-1.5"
                >
                  <Link href={demo.path}>
                    View demo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pb-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {demo.desc}
              </p>

              {demo.badges.length > 0 && (
                <CardFooter className="flex flex-wrap gap-1.5">
                  {demo.badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant={BADGE_VARIANTS[badge] ?? "secondary"}
                      className="font-mono text-xs"
                    >
                      {badge}
                    </Badge>
                  ))}
                </CardFooter>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
