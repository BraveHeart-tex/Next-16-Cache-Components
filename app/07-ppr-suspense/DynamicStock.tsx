import { getProductById } from "@/lib/db";
import { getRenderTimestamp } from "@/lib/timestamp";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export async function DynamicStock({ productId }: { productId: number }) {
  const product = await getProductById(productId);
  const ts = getRenderTimestamp();
  const stock = product?.stock ?? 0;
  const inStock = stock > 0;

  return (
    <div>
      <Separator className="mb-4" />
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Availability</span>
        <Badge
          variant={inStock ? "default" : "destructive"}
          className={
            inStock
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : ""
          }
        >
          {inStock ? `${stock} in stock` : "Out of stock"}
        </Badge>
      </div>
      <div className="text-xs text-muted-foreground font-mono text-right">
        Stock checked at:{" "}
        <span className="text-orange-500 font-semibold">{ts}</span>
      </div>
    </div>
  );
}
