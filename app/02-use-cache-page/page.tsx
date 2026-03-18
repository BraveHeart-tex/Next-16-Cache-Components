// "use cache";
import { cacheLife } from "next/cache";
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
import { Separator } from "@/components/ui/separator";
import { Info, TriangleAlert } from "lucide-react";
import { CacheLifecycle } from "../01-no-cache/CacheLifeCycle";

export default async function UseCachePage() {
  // cacheLife("demo_short");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products: any[] = [];
  const ts = getRenderTimestamp();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="outline" className="font-mono">
          02
        </Badge>
        <h2 className="text-2xl font-semibold">Page-level cache</h2>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          The entire page is cached using{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
            &apos;use cache&apos;
          </code>{" "}
          at the file level with{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
            cacheLife(&apos;demo_short&apos;)
          </code>{" "}
          — stale: 10s, revalidate: 15s, expire: 30s.
        </AlertDescription>
      </Alert>

      <Card className="mb-6 font-mono text-sm">
        <CardContent className="pt-4 space-y-1.5">
          <div>
            Rendered at:{" "}
            <span className="text-orange-500 font-semibold">{ts}</span>
          </div>
          <div className="text-muted-foreground">
            Cache profile:{" "}
            <span className="text-foreground font-medium">demo_short</span>
          </div>
          <Separator className="my-2" />
          <CacheLifecycle />
        </CardContent>
      </Card>

      <div className="rounded-md border mb-6 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
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

      <Alert className="mb-6 border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
        <TriangleAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription>
          <span className="font-medium">Notice: </span>
          the timestamp above does NOT change on refresh. That&apos;s the cache
          working. Wait 30 seconds and refresh again to see it expire.
        </AlertDescription>
      </Alert>

      <div className="bg-gray-950 text-green-400 font-mono text-xs rounded-lg p-4 overflow-x-auto">
        <pre>{`'use cache'
import { cacheLife } from 'next/cache'

export default async function UseCachePage() {
  cacheLife('demo_short')
  // stale: 10s · revalidate: 15s · expire: 30s
  // ...
}`}</pre>
      </div>
    </div>
  );
}
