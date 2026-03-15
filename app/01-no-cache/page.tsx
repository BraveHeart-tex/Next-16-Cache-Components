import { Suspense } from "react";
import { getAllProducts } from "@/lib/db";
import { getRenderTimestamp } from "@/lib/timestamp";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Info } from "lucide-react";

async function DynamicProductContent() {
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

function ProductTableSkeleton() {
  return (
    <div className="space-y-4 mb-6">
      <Card>
        <CardContent className="pt-4 space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {["ID", "Name", "Price", "Category", "Stock"].map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function NoCachePage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="outline" className="font-mono">
          01
        </Badge>
        <h2 className="text-2xl font-semibold">No cache — fully dynamic</h2>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          This page has no caching. Every request hits the fake database and
          computes a fresh response. This is the default behavior in Next.js
          15+.
        </AlertDescription>
      </Alert>

      <Suspense fallback={<ProductTableSkeleton />}>
        <DynamicProductContent />
      </Suspense>

      <Alert variant="default" className="bg-muted border-muted-foreground/20">
        <AlertDescription className="text-muted-foreground">
          <span className="font-medium text-foreground">Instruction: </span>
          Refresh this page multiple times — the timestamp will change on every
          request.
        </AlertDescription>
      </Alert>
    </div>
  );
}
