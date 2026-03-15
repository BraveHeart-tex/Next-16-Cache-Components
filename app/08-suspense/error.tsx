"use client";

import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TriangleAlert } from "lucide-react";

export default function SuspenseDemoError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <TriangleAlert className="h-4 w-4 text-red-600 dark:text-red-400" />
          <CardTitle className="text-sm text-red-800 dark:text-red-200">
            Async component threw
          </CardTitle>
          <Badge className="ml-auto bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 font-mono text-xs">
            error.tsx caught this
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Alert variant="destructive" className="py-2">
          <AlertDescription className="font-mono text-xs">
            {error.message}
          </AlertDescription>
        </Alert>
        <p className="text-xs text-red-700 dark:text-red-300">
          This error was caught by{" "}
          <code className="bg-red-200 dark:bg-red-800 px-1 rounded font-mono">
            app/08-suspense/error.tsx
          </code>
          . The rest of the page kept rendering — only this segment was
          affected.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          className="border-red-300 text-red-800 hover:bg-red-100 dark:text-red-200 dark:hover:bg-red-900"
        >
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
