import { cookies } from "next/headers";
import { Suspense } from "react";
import { ProductGrid } from "./ProductGrid";
import { MOCK_USER } from "@/lib/mock-user";
import { getRenderTimestamp } from "@/lib/timestamp";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Info } from "lucide-react";

async function DynamicHeader() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value || MOCK_USER.name;
  const hrTs = getRenderTimestamp();

  return (
    <Card className="mb-6 font-mono text-sm">
      <CardContent className="pt-4 space-y-1.5">
        <div className="text-base font-sans not-italic">
          Hello, <span className="font-semibold">{username}</span>!
        </div>
        <div className="text-muted-foreground">
          Header rendered at:{" "}
          <span className="text-orange-500 font-semibold">{hrTs}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function DynamicHeaderSkeleton() {
  return (
    <Card className="mb-6">
      <CardContent className="pt-4 space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-56" />
      </CardContent>
    </Card>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="space-y-2 p-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-full" />
      ))}
    </div>
  );
}

export default function ComponentCachePage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="outline" className="font-mono">
          03
        </Badge>
        <h2 className="text-2xl font-semibold">Component-level cache</h2>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          The header is dynamic — it reads cookies so it runs on every request.
          The product grid is a separate component with{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
            &apos;use cache&apos;
          </code>{" "}
          — its timestamp freezes.
        </AlertDescription>
      </Alert>

      <Suspense fallback={<DynamicHeaderSkeleton />}>
        <DynamicHeader />
      </Suspense>

      <Card className="relative">
        <div className="absolute top-0 right-0">
          <Badge
            variant="secondary"
            className="font-mono text-xs rounded-tl-none rounded-br-none rounded-tr-md rounded-bl-md"
          >
            &lt;ProductGrid /&gt;
          </Badge>
        </div>
        <CardContent className="pt-8">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
