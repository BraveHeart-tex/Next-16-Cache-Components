import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function CacheLifecycle() {
  return (
    <Card className="font-mono text-xs">
      <CardContent className="pt-4 space-y-4">
        {/* Timeline */}
        <div className="flex items-center justify-between text-center">
          <div className="flex flex-col items-center gap-1">
            <Badge variant="default">0s</Badge>
            <span className="text-muted-foreground">fresh</span>
          </div>

          <div className="h-px flex-1 bg-border mx-2" />

          <div className="flex flex-col items-center gap-1">
            <Badge variant="secondary">10s</Badge>
            <span className="text-muted-foreground">stale (client-side)</span>
          </div>

          <div className="h-px flex-1 bg-border mx-2" />

          <div className="flex flex-col items-center gap-1">
            <Badge variant="secondary">15s</Badge>
            <span className="text-muted-foreground">
              revalidate (server-side)
            </span>
          </div>

          <div className="h-px flex-1 bg-border mx-2" />

          <div className="flex flex-col items-center gap-1">
            <Badge variant="destructive">30s</Badge>
            <span className="text-muted-foreground">expire</span>
          </div>
        </div>

        <Separator />

        {/* Explanation */}
        <div className="space-y-2 text-muted-foreground leading-relaxed">
          <p>
            <span className="text-foreground font-medium">0–10s:</span> Served
            from cache (fresh, no updates)
          </p>
          <p>
            <span className="text-foreground font-medium">10–15s:</span> Still
            served (stale, but no revalidation yet)
          </p>
          <p>
            <span className="text-foreground font-medium">15–30s:</span> Served
            stale + background revalidation triggered
          </p>
          <p>
            <span className="text-foreground font-medium">30s+:</span> Cache
            expired, request blocks for fresh data
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
