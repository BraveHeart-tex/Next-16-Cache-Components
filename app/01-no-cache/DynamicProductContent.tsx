import { getAllProducts } from "@/lib/db";
import { getRenderTimestamp } from "@/lib/timestamp";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cacheLife } from "next/cache";
import { cacheTag } from "next/cache";

export async function DynamicProductContent() {
  "use cache";
  cacheTag("products");
  cacheLife("demo_short");
  const products = await getAllProducts();
  const ts = getRenderTimestamp();

  return (
    <>
      <Card className="mb-6 font-mono text-sm">
        <CardContent className="pt-4 space-y-1">
          <div>
            Rendered at:{" "}
            <span className="text-orange-500 font-semibold">{ts}</span>
          </div>
          <div className="text-muted-foreground">
            Products fetched:{" "}
            <span className="text-foreground font-medium">
              {products.length}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border mb-6 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium w-16">ID</TableHead>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Price</TableHead>
              <TableHead className="font-medium">Category</TableHead>
              <TableHead className="font-medium">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-muted-foreground">
                  {p.id}
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell className="capitalize">{p.category}</TableCell>
                <TableCell>{p.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
