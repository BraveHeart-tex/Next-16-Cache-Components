import { getRenderTimestamp } from "@/lib/timestamp";
import { getCachedProduct } from "./data";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Info } from "lucide-react";
import type { Product } from "@/lib/db";

async function DynamicProductCards() {
  const pageTs = getRenderTimestamp();
  const product1 = await getCachedProduct(1);
  const product2 = await getCachedProduct(2);

  return (
    <>
      <Card className="mb-6 font-mono text-sm">
        <CardContent className="pt-4">
          <span className="text-muted-foreground">Page rendered at: </span>
          <span className="text-orange-500 font-semibold">{pageTs}</span>
          <Badge variant="destructive" className="ml-2 text-xs font-mono">
            changes every request
          </Badge>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <ProductCard product={product1} cacheKey="product-1" />
        <ProductCard product={product2} cacheKey="product-2" />
      </div>
    </>
  );
}

function ProductCard({
  product,
  cacheKey,
}: {
  product: Product | null;
  cacheKey: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2 pt-4 px-4">
        <Badge variant="outline" className="font-mono text-xs w-fit">
          cached separately: {cacheKey}
        </Badge>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {product ? (
          <div className="space-y-1">
            <h3 className="font-semibold text-base">{product.name}</h3>
            <p className="text-muted-foreground text-sm">${product.price}</p>
            <p className="text-sm">
              Stock: <span className="font-medium">{product.stock}</span>
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Product not found</p>
        )}
      </CardContent>
    </Card>
  );
}

function DynamicProductCardsSkeleton() {
  return (
    <>
      <Card className="mb-6">
        <CardContent className="pt-4">
          <Skeleton className="h-4 w-64" />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2 pt-4 px-4">
              <Skeleton className="h-5 w-36" />
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default function FunctionCachePage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="outline" className="font-mono">
          04
        </Badge>
        <h2 className="text-2xl font-semibold">Function-level cache</h2>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          The page component re-renders on every request (see the page timestamp
          above). But the data functions are cached —{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
            getCachedProduct(1)
          </code>{" "}
          and{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
            getCachedProduct(2)
          </code>{" "}
          each have their own cache entry because the arguments are part of the
          cache key.
        </AlertDescription>
      </Alert>

      <Suspense fallback={<DynamicProductCardsSkeleton />}>
        <DynamicProductCards />
      </Suspense>

      <h3 className="text-base font-semibold mb-3">How it works</h3>
      <div className="bg-gray-950 text-green-400 font-mono text-xs rounded-lg p-4 overflow-x-auto">
        <pre>{`export async function getCachedProduct(id: number) {
  'use cache'
  cacheLife('demo_short')
  cacheTag('products', \`product-\${id}\`)
  return getProductById(id)
}`}</pre>
      </div>
    </div>
  );
}
