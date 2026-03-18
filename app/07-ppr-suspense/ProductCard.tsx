import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductById } from "@/lib/db";
import { getRenderTimestamp } from "@/lib/timestamp";
import { Suspense } from "react";
import { DynamicStock } from "./DynamicStock";
import { Badge } from "@/components/ui/badge";
import { cacheLife, cacheTag } from "next/cache";

export const ProductCard = async () => {
  "use cache";
  cacheLife("demo_long");
  cacheTag("product", "product-1");
  const shellTs = getRenderTimestamp();
  const product = await getProductById(1);

  if (!product) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Product not found.</AlertDescription>
      </Alert>
    );
  }

  return (
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
          This high-quality product is built for durability and performance. It
          features a premium design that fits perfectly in any modern workspace
          setup, ensuring you stay productive and comfortable throughout the
          day.
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
      </CardContent>
    </Card>
  );
};
