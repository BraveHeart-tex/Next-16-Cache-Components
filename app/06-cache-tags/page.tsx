import { cacheLife, cacheTag } from "next/cache";
import { getAllProducts } from "@/lib/db";
import { getRenderTimestamp } from "@/lib/timestamp";
import {
  addProductSWR,
  addProductImmediate,
  renameProductImmediate,
} from "./actions";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

async function getCachedProductList() {
  "use cache";
  cacheLife("demo_long");
  cacheTag("products");
  return getAllProducts();
}

export default async function CacheTagsPage() {
  const products = await getCachedProductList();
  const listRenderTs = getRenderTimestamp();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="outline" className="font-mono">
          06
        </Badge>
        <h2 className="text-2xl font-semibold">
          Cache tags &amp; invalidation
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column — product list */}
        <div>
          <Card className="mb-4 font-mono text-sm">
            <CardContent className="pt-4 space-y-1">
              <div>
                List rendered at:{" "}
                <span className="text-orange-500 font-semibold">
                  {listRenderTs}
                </span>
              </div>
              <div className="text-muted-foreground">
                Total products:{" "}
                <span className="text-foreground font-medium">
                  {products.length}
                </span>
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

        {/* Right column — mutations */}
        <div className="space-y-4">
          {/* revalidateTag — SWR */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">revalidateTag (SWR)</CardTitle>
                <Badge variant="secondary" className="font-mono text-xs">
                  eventual consistency
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <form action={addProductSWR} className="flex gap-2">
                <Input
                  type="text"
                  name="name"
                  placeholder="Item name"
                  required
                  defaultValue="SWR Mouse"
                  className="text-sm"
                />
                <Input
                  type="number"
                  name="price"
                  placeholder="Price"
                  required
                  defaultValue="29"
                  className="text-sm w-24"
                />
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Add (SWR)
                </Button>
              </form>
              <Alert className="py-2">
                <AlertDescription className="text-xs leading-relaxed">
                  Uses{" "}
                  <code className="bg-muted px-1 py-0.5 rounded font-mono">
                    revalidateTag(&apos;products&apos;, &apos;max&apos;)
                  </code>
                  . The list will <strong>not</strong> update on your next
                  refresh — serves stale data first. Refresh again to see the
                  new product. This is stale-while-revalidate.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* updateTag — immediate */}
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-blue-900 dark:text-blue-100">
                  updateTag (immediate)
                </CardTitle>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 font-mono text-xs">
                  immediate consistency
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <form action={addProductImmediate} className="flex gap-2">
                <Input
                  type="text"
                  name="name"
                  placeholder="Item name"
                  required
                  defaultValue="Fast Keyboard"
                  className="text-sm bg-background"
                />
                <Input
                  type="number"
                  name="price"
                  placeholder="Price"
                  required
                  defaultValue="99"
                  className="text-sm w-24 bg-background"
                />
                <Button type="submit" size="sm" className="whitespace-nowrap">
                  Add (immediate)
                </Button>
              </form>
              <Alert className="border-blue-200 bg-blue-100/50 dark:bg-blue-900/30 py-2">
                <AlertDescription className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                  Uses{" "}
                  <code className="bg-blue-200 dark:bg-blue-800 px-1 py-0.5 rounded font-mono">
                    updateTag(&apos;products&apos;)
                  </code>{" "}
                  in a Server Action. The list <strong>will</strong> show your
                  new product on the very next refresh. This is
                  read-your-own-writes.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Rename — granular tag invalidation */}
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-amber-900 dark:text-amber-100">
                Edit product name
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form action={renameProductImmediate} className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-amber-800 dark:text-amber-200">
                    Select product
                  </Label>
                  <Select name="id" required>
                    <SelectTrigger className="bg-background border-amber-300 text-sm">
                      <SelectValue placeholder="Choose a product…" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={String(p.id)}>
                          {p.id} — {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-amber-800 dark:text-amber-200">
                    New name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="New name"
                    required
                    className="text-sm bg-background border-amber-300"
                  />
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full border-amber-400 text-amber-900 hover:bg-amber-100 dark:text-amber-100 dark:hover:bg-amber-900"
                >
                  Rename (immediate)
                </Button>
              </form>
              <Alert className="border-amber-200 bg-amber-100/50 dark:bg-amber-900/30 py-2">
                <AlertDescription className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                  Uses{" "}
                  <code className="bg-amber-200 dark:bg-amber-800 px-1 py-0.5 rounded font-mono">
                    updateTag
                  </code>{" "}
                  on both{" "}
                  <code className="bg-amber-200 dark:bg-amber-800 px-1 py-0.5 rounded font-mono">
                    &apos;products&apos;
                  </code>{" "}
                  and{" "}
                  <code className="bg-amber-200 dark:bg-amber-800 px-1 py-0.5 rounded font-mono">
                    &apos;product-[id]&apos;
                  </code>
                  . Invalidates the list <em>and</em> any specific cached
                  lookups for that ID (like in Route 04).
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      <Card className="bg-muted/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            Follow these steps carefully
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>
              Note the product count and &quot;List rendered at&quot; timestamp.
            </li>
            <li>
              Click{" "}
              <Badge variant="outline" className="font-mono text-xs mx-1">
                Add (SWR)
              </Badge>{" "}
              — refresh once. Nothing changed!
            </li>
            <li>
              Refresh <strong className="text-foreground">again</strong> — the
              new product finally appears.
            </li>
            <li>
              Click{" "}
              <Badge variant="default" className="font-mono text-xs mx-1">
                Add (immediate)
              </Badge>{" "}
              — refresh once. New product appears immediately.
            </li>
            <li className="text-foreground font-medium">
              This is the difference between{" "}
              <code className="bg-muted px-1 rounded font-mono text-xs">
                revalidateTag
              </code>{" "}
              and{" "}
              <code className="bg-muted px-1 rounded font-mono text-xs">
                updateTag
              </code>
              .
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
