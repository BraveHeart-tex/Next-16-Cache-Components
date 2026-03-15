import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { getRenderTimestamp } from "@/lib/timestamp";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";

type PanelColor = "red" | "yellow" | "green";

type PanelProps = {
  label: string;
  ts: string;
  stale: number;
  revalidate: number;
  expire: number;
  color: PanelColor;
};

const COLOR_VARIANTS: Record<
  PanelColor,
  { card: string; badge: string; badgeLabel: string }
> = {
  red: {
    card: "border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800",
    badge: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    badgeLabel: "SHORT",
  },
  yellow: {
    card: "border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800",
    badge:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    badgeLabel: "MEDIUM",
  },
  green: {
    card: "border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800",
    badge: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    badgeLabel: "LONG",
  },
};

function PanelUI({ label, ts, stale, revalidate, expire, color }: PanelProps) {
  const v = COLOR_VARIANTS[color];
  return (
    <Card className={v.card}>
      <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
        <CardTitle className="font-mono text-base">{label}</CardTitle>
        <span className={`text-xs px-2 py-0.5 rounded font-bold ${v.badge}`}>
          {v.badgeLabel}
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-background/60 rounded-md border px-3 py-2 font-mono text-sm">
          Frozen at: <span className="text-orange-500 font-bold">{ts}</span>
        </div>
        <div className="font-mono text-sm space-y-1">
          {[
            { key: "stale", value: stale },
            { key: "revalidate", value: revalidate },
            { key: "expire", value: expire },
          ].map(({ key, value }) => (
            <div key={key} className="flex justify-between">
              <span className="text-muted-foreground">{key}:</span>
              <strong>{value}s</strong>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PanelSkeleton({ color }: { color: PanelColor }) {
  const v = COLOR_VARIANTS[color];
  return (
    <Card className={v.card}>
      <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-14" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

async function ShortPanel() {
  "use cache";
  cacheLife("demo_short");
  const ts = getRenderTimestamp();
  return (
    <PanelUI
      label="demo_short"
      ts={ts}
      stale={10}
      revalidate={15}
      expire={30}
      color="red"
    />
  );
}

async function MediumPanel() {
  "use cache";
  cacheLife("demo_medium");
  const ts = getRenderTimestamp();
  return (
    <PanelUI
      label="demo_medium"
      ts={ts}
      stale={30}
      revalidate={60}
      expire={120}
      color="yellow"
    />
  );
}

async function LongPanel() {
  "use cache";
  cacheLife("demo_long");
  const ts = getRenderTimestamp();
  return (
    <PanelUI
      label="demo_long"
      ts={ts}
      stale={120}
      revalidate={300}
      expire={600}
      color="green"
    />
  );
}

const PROFILES = [
  {
    name: "demo_short",
    stale: "10s",
    revalidate: "15s",
    expire: "30s",
    highlight: false,
  },
  {
    name: "demo_medium",
    stale: "30s",
    revalidate: "60s",
    expire: "120s",
    highlight: false,
  },
  {
    name: "demo_long",
    stale: "120s",
    revalidate: "300s",
    expire: "600s",
    highlight: false,
  },
  {
    name: "inline custom",
    stale: "5s",
    revalidate: "10s",
    expire: "20s",
    highlight: true,
  },
];

export default function CacheLifePage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="outline" className="font-mono">
          05
        </Badge>
        <h2 className="text-2xl font-semibold">Cache life configurations</h2>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription className="space-y-1">
          <p>
            <span className="font-medium">Instructions:</span> Refresh
            repeatedly. The{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
              demo_short
            </code>{" "}
            panel (red) will update first. The others stay frozen longer —
            independent cache lifetimes per component.
          </p>
          <p className="text-muted-foreground">
            A cache entry goes through 3 phases:{" "}
            <Badge variant="secondary" className="font-mono text-xs">
              Fresh
            </Badge>{" "}
            (&lt;stale) →{" "}
            <Badge variant="secondary" className="font-mono text-xs">
              Stale
            </Badge>{" "}
            (&lt;revalidate) →{" "}
            <Badge variant="secondary" className="font-mono text-xs">
              Expired
            </Badge>{" "}
            (&gt;expire).
          </p>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Suspense fallback={<PanelSkeleton color="red" />}>
          <ShortPanel />
        </Suspense>
        <Suspense fallback={<PanelSkeleton color="yellow" />}>
          <MediumPanel />
        </Suspense>
        <Suspense fallback={<PanelSkeleton color="green" />}>
          <LongPanel />
        </Suspense>
      </div>

      <div className="mb-8">
        <h3 className="text-base font-semibold mb-3">
          Cache profiles in{" "}
          <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
            next.config.ts
          </code>
        </h3>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Stale</TableHead>
                <TableHead>Revalidate</TableHead>
                <TableHead>Expire</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROFILES.map((p) => (
                <TableRow
                  key={p.name}
                  className={p.highlight ? "bg-amber-50 dark:bg-amber-950" : ""}
                >
                  <TableCell
                    className={`font-mono ${p.highlight ? "text-amber-700 dark:text-amber-300" : ""}`}
                  >
                    {p.name}
                  </TableCell>
                  <TableCell
                    className={
                      p.highlight ? "text-amber-700 dark:text-amber-300" : ""
                    }
                  >
                    {p.stale}
                  </TableCell>
                  <TableCell
                    className={
                      p.highlight ? "text-amber-700 dark:text-amber-300" : ""
                    }
                  >
                    {p.revalidate}
                  </TableCell>
                  <TableCell
                    className={
                      p.highlight ? "text-amber-700 dark:text-amber-300" : ""
                    }
                  >
                    {p.expire}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Custom inline profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            You can skip named profiles and pass an object directly. Useful for
            one-off cache lifetimes.
          </p>
          <Separator />
          <div className="bg-gray-950 text-green-400 font-mono text-xs rounded-lg p-4 overflow-x-auto">
            <pre>{`'use cache'
cacheLife({ stale: 5, revalidate: 10, expire: 20 })`}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
