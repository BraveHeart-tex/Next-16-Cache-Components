"use cache";

import { cacheLife, cacheTag } from "next/cache";
import { getAllProducts } from "@/lib/db";
import { getRenderTimestamp } from "@/lib/timestamp";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function ProductGrid() {
  cacheLife("demo_short");
  cacheTag("products");

  const products = await getAllProducts();
  const ts = getRenderTimestamp();

  return (
    <div>
      <Card className="mb-4 font-mono text-sm inline-block">
        <CardContent className="pt-3 pb-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs">
              cached
            </Badge>
            <span className="text-muted-foreground">
              Component rendered at:
            </span>{" "}
            <span className="text-orange-500 font-semibold">{ts}</span>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
