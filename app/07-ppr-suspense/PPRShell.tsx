"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { getProductById } from "@/lib/db";
import { getRenderTimestamp } from "@/lib/timestamp";
import { Suspense } from "react";
import { DynamicStock } from "./DynamicStock";
import { DynamicCart } from "./DynamicCart";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Info } from "lucide-react";
import type { CartItem } from "./actions";

export async function PPRShell({ cart }: { cart: CartItem[] }) {
  cacheLife("demo_long");
  cacheTag("products");

  const product = await getProductById(1);
  const shellTs = getRenderTimestamp();

  if (!product) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Product not found.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="outline" className="font-mono">
          07
        </Badge>
        <h2 className="text-2xl font-semibold">PPR + Suspense streaming</h2>
      </div>

      <Alert className="mb-8">
        <Info className="h-4 w-4" />
        <AlertDescription className="space-y-2">
          <p>
            The product info (name, price, description) is in the{" "}
            <span className="font-medium">static cached shell</span> — it
            renders instantly from cache.
          </p>
          <p>
            The stock count and cart button are inside{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
              &lt;Suspense&gt;
            </code>{" "}
            boundaries — they run at request time and stream in after the shell.
          </p>
          <p className="font-medium">
            Try throttling your network to{" "}
            <Badge variant="secondary" className="font-mono text-xs">
              Slow 3G
            </Badge>{" "}
            — you&apos;ll see the shell appear first, then the dynamic parts
            fill in.
          </p>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Product card — the live demo */}
        <Card className="relative">
          <Badge
            variant="secondary"
            className="absolute top-0 right-0 font-mono text-xs rounded-tl-none rounded-br-none rounded-tr-md rounded-bl-md"
          >
            &quot;use cache&quot; shell
          </Badge>
          <CardContent className="pt-8 space-y-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
              <div className="text-xl font-medium text-muted-foreground">
                ${product.price}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              This high-quality product is built for durability and performance.
              It features a premium design that fits perfectly in any modern
              workspace setup, ensuring you stay productive and comfortable
              throughout the day.
            </p>

            <Card className="inline-block font-mono text-xs">
              <CardContent className="pt-3 pb-3">
                Shell rendered at:{" "}
                <span className="text-orange-500 font-semibold">{shellTs}</span>
              </CardContent>
            </Card>

            <Suspense
              fallback={
                <div className="border-t pt-4 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              }
            >
              <DynamicStock productId={product.id} />
            </Suspense>

            <Suspense
              fallback={
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-11 w-full rounded-md" />
                  <Skeleton className="h-3 w-1/2 mx-auto" />
                </div>
              }
            >
              {/* cart was read outside the cache boundary in page.tsx and passed here */}
              <DynamicCart productId={product.id} cart={cart} />
            </Suspense>
          </CardContent>
        </Card>

        {/* Architecture diagram */}
        <div>
          <h3 className="text-base font-semibold mb-4">Architecture</h3>
          <div className="rounded-xl border-2 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800 p-4 h-full space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 font-mono text-xs">
                &quot;use cache&quot;
              </Badge>
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Static shell
              </span>
            </div>

            <Card className="bg-white/80 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700">
              <CardContent className="pt-3 pb-3 text-sm text-blue-800 dark:text-blue-200 space-y-0.5">
                <div className="font-medium">Product name</div>
                <div className="text-muted-foreground text-xs">
                  Price · Description · Shell timestamp
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "DynamicStock", sub: "stock count · checked at" },
                { label: "DynamicCart", sub: "add to cart · updated at" },
              ].map(({ label, sub }) => (
                <div
                  key={label}
                  className="rounded-lg border-2 border-orange-300 bg-orange-50 dark:bg-orange-950 dark:border-orange-700 p-3 space-y-1"
                >
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant="outline"
                      className="font-mono text-xs border-orange-300 text-orange-700 dark:text-orange-300 px-1.5"
                    >
                      Suspense
                    </Badge>
                  </div>
                  <div className="font-mono text-xs font-semibold text-orange-900 dark:text-orange-100">
                    {label}
                  </div>
                  <div className="text-xs text-orange-700 dark:text-orange-300">
                    {sub}
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-200 text-xs font-normal">
                    dynamic
                  </Badge>
                </div>
              ))}
            </div>

            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              The shell ships instantly from cache. Dynamic slots stream in
              after — they never block the shell from rendering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
