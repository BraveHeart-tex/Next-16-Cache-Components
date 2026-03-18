import { Suspense } from "react";
import { PPRShell } from "./PPRShell";
import { Skeleton } from "@/components/ui/skeleton";
import { DynamicCart } from "./DynamicCart";

export default async function PPRPage() {
  return (
    <>
      <PPRShell />
      <Suspense
        fallback={
          <div className="space-y-2 pt-2">
            <Skeleton className="h-11 w-full rounded-md" />
            <Skeleton className="h-3 w-1/2 mx-auto" />
          </div>
        }
      >
        <DynamicCart productId={1} />
      </Suspense>
    </>
  );
}
