import { getRenderTimestamp } from "@/lib/timestamp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2 } from "lucide-react";
import { addToCart, clearCart, getCart } from "./actions";

export async function DynamicCart({ productId }: { productId: number }) {
  const cart = await getCart();
  const ts = getRenderTimestamp();
  const item = cart.find((i) => i.productId === productId);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Card className="bg-muted/40">
      <CardContent className="pt-4 pb-4 space-y-4">
        <form action={addToCart.bind(null, productId)}>
          <Button type="submit" className="w-full gap-2" size="lg">
            <ShoppingCart className="h-4 w-4" />
            {item ? `Add another (${item.quantity} in cart)` : "Add to cart"}
          </Button>
        </form>

        {cart.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cart</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </Badge>
              </div>
              <ul className="space-y-1">
                {cart.map((i) => (
                  <li
                    key={i.productId}
                    className="flex justify-between text-xs text-muted-foreground"
                  >
                    <span>
                      {i.name}{" "}
                      <span className="text-foreground font-medium">
                        ×{i.quantity}
                      </span>
                    </span>
                    <span>${(i.price * i.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-1 border-t">
                <span className="text-xs font-medium">Total</span>
                <span className="text-xs font-semibold">
                  $
                  {cart
                    .reduce((sum, i) => sum + i.price * i.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <form action={clearCart}>
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="w-full text-muted-foreground gap-1.5 h-7 text-xs"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear cart
                </Button>
              </form>
            </div>
          </>
        )}

        <p className="text-xs text-center text-muted-foreground font-mono">
          Cart last updated:{" "}
          <span className="text-orange-500 font-semibold">{ts}</span>
        </p>
      </CardContent>
    </Card>
  );
}
