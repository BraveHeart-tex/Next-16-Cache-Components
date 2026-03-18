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
import { DynamicProductContent } from "./DynamicProductContent";

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
