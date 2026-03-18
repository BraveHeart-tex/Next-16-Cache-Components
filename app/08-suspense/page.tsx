import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Info } from "lucide-react";

// ─── Fake async helpers ────────────────────────────────────────────────────────
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchUserProfile() {
  await delay(600);
  return {
    name: "Deniz Easy Money Sarikas",
    role: "Middle Engineer",
    avatar: "DS",
  };
}

async function fetchActivityFeed() {
  await delay(1400);
  return [
    { id: 1, text: "Merged PR #412 — fix cache invalidation", time: "2m ago" },
    { id: 2, text: "Commented on issue #88", time: "14m ago" },
    { id: 3, text: "Opened PR #413 — add Suspense demo", time: "1h ago" },
  ];
}

async function fetchRecommendations() {
  await delay(2200);
  return [
    { id: 1, title: "React 19 Suspense deep dive", tag: "article" },
    { id: 2, title: "PPR in Next.js 16", tag: "docs" },
    { id: 3, title: "Streaming SSR patterns", tag: "video" },
  ];
}

async function fetchSlowWidget() {
  await delay(3000);
  return { value: "94%", label: "Cache hit rate this week" };
}

// TODO: Test error boundaries here
async function fetchBrokenData() {
  await delay(500);
  return null;
  // throw new Error("Failed to load — simulated network error");
}

// ─── Real async components ────────────────────────────────────────────────────

async function UserProfile() {
  const user = await fetchUserProfile();
  return (
    <Card>
      <CardContent className="pt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">
          {user.avatar}
        </div>
        <div>
          <div className="font-medium text-sm">{user.name}</div>
          <div className="text-xs text-muted-foreground">{user.role}</div>
        </div>
        <Badge variant="secondary" className="ml-auto font-mono text-xs">
          ~600ms
        </Badge>
      </CardContent>
    </Card>
  );
}

async function ActivityFeed() {
  const items = await fetchActivityFeed();
  return (
    <Card>
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Recent activity</CardTitle>
          <Badge variant="secondary" className="font-mono text-xs">
            ~1400ms
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-xs">
            <span className="text-muted-foreground">{item.text}</span>
            <span className="text-muted-foreground shrink-0 ml-4">
              {item.time}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

async function Recommendations() {
  const items = await fetchRecommendations();
  return (
    <Card>
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Recommended for you</CardTitle>
          <Badge variant="secondary" className="font-mono text-xs">
            ~2200ms
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-xs"
          >
            <span>{item.title}</span>
            <Badge variant="outline" className="font-mono text-xs">
              {item.tag}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

async function SlowWidget() {
  const data = await fetchSlowWidget();
  return (
    <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
      <CardContent className="pt-4 text-center">
        <div className="text-3xl font-bold text-green-700 dark:text-green-300">
          {data.value}
        </div>
        <div className="text-xs text-green-600 dark:text-green-400 mt-1">
          {data.label}
        </div>
        <Badge variant="secondary" className="font-mono text-xs mt-2">
          ~3000ms
        </Badge>
      </CardContent>
    </Card>
  );
}

async function BrokenComponent() {
  await fetchBrokenData();
  return (
    <Card>
      <CardContent>This never renders</CardContent>
    </Card>
  );
}

// ─── Skeletons ────────────────────────────────────────────────────────────────

function UserProfileSkeleton() {
  return (
    <Card>
      <CardContent className="pt-4 flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityFeedSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2 pt-4">
        <Skeleton className="h-4 w-28" />
      </CardHeader>
      <CardContent className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between gap-4">
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-3 w-12 shrink-0" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function RecommendationsSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2 pt-4">
        <Skeleton className="h-4 w-36" />
      </CardHeader>
      <CardContent className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between gap-4">
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SlowWidgetSkeleton() {
  return (
    <Card>
      <CardContent className="pt-4 flex flex-col items-center gap-2">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SuspensePage() {
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="font-mono">
          08
        </Badge>
        <h2 className="text-2xl font-semibold">Suspense — how and why</h2>
      </div>

      {/* ── SECTION 1: What is Suspense ─────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold mb-1">What is Suspense?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">
              &lt;Suspense&gt;
            </code>{" "}
            is a React boundary that lets you declaratively handle async
            components. While a child component is waiting for data, React
            renders the{" "}
            <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">
              fallback
            </code>{" "}
            prop in its place. When the data arrives, the fallback is swapped
            out for the real content — without blocking anything outside the
            boundary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Without Suspense */}
          <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-red-800 dark:text-red-200">
                  Without Suspense
                </CardTitle>
                <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs">
                  blocks
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-gray-950 text-green-400 font-mono text-xs rounded p-3 leading-relaxed">
                <pre>{`// Entire page waits for the
// slowest component to resolve.
// User sees nothing until ALL
// data is ready.

export default async function Page() {
  const user = await fetchUser()    // 600ms
  const feed = await fetchFeed()    // 1400ms
  const recs = await fetchRecs()    // 2200ms
  // Total wait: 4200ms ❌
}`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* With Suspense */}
          <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-green-800 dark:text-green-200">
                  With Suspense
                </CardTitle>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                  streams
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-950 text-green-400 font-mono text-xs rounded p-3 leading-relaxed">
                <pre>{`// Each component resolves
// independently. User sees
// content as soon as each
// piece is ready.

export default function Page() {
  return <>
    <Suspense fallback={<Skeleton />}>
      <User />     {/* appears at 600ms  */}
    </Suspense>
    <Suspense fallback={<Skeleton />}>
      <Feed />     {/* appears at 1400ms */}
    </Suspense>
    <Suspense fallback={<Skeleton />}>
      <Recs />     {/* appears at 2200ms */}
    </Suspense>
  </>
  // First content at 600ms ✅
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* ── SECTION 2: Waterfall vs Parallel ───────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold mb-1">
            Example 1 — Waterfall vs parallel fetching
          </h3>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Each component below fetches at a different speed. Because
              they&apos;re wrapped in separate{" "}
              <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">
                &lt;Suspense&gt;
              </code>{" "}
              boundaries they resolve{" "}
              <span className="font-medium">independently and in parallel</span>{" "}
              — the profile appears at 600ms without waiting for the feed at
              1400ms. Refresh the page to see the staggered streaming in action.
            </AlertDescription>
          </Alert>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Suspense fallback={<UserProfileSkeleton />}>
            <UserProfile />
          </Suspense>
          <Suspense fallback={<ActivityFeedSkeleton />}>
            <ActivityFeed />
          </Suspense>
          <Suspense fallback={<RecommendationsSkeleton />}>
            <Recommendations />
          </Suspense>
        </div>
      </section>

      <Separator />

      {/* ── SECTION 3: Nested Suspense boundaries ─────────────────────── */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold mb-1">
            Example 2 — Nested Suspense boundaries
          </h3>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              You can nest Suspense boundaries at any granularity. The outer
              boundary wraps a whole section — if you want a section-level
              skeleton while multiple children load. The inner boundary wraps
              just one slow widget — so the rest of the section renders without
              waiting for it. Granularity is a UX decision, not a technical one.
            </AlertDescription>
          </Alert>
        </div>

        {/* Outer boundary — wraps the whole dashboard section */}
        <Suspense
          fallback={
            <Card>
              <CardContent className="pt-4 space-y-3">
                <Skeleton className="h-5 w-40" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm">Dashboard section</CardTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  outer Suspense
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Fast widget — no extra boundary needed */}
                <Suspense fallback={<UserProfileSkeleton />}>
                  <UserProfile />
                </Suspense>

                {/* Slow widget gets its own inner boundary */}
                <Suspense fallback={<SlowWidgetSkeleton />}>
                  <SlowWidget />
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </Suspense>

        <div className="bg-gray-950 text-green-400 font-mono text-xs rounded-lg p-4 overflow-x-auto">
          <pre>{`<Suspense fallback={<SectionSkeleton />}>        {/* outer */}
  <DashboardSection>
    <Suspense fallback={<UserProfileSkeleton />}> {/* inner */}
      <UserProfile />                             {/* 600ms  */}
    </Suspense>

    <Suspense fallback={<SlowWidgetSkeleton />}>  {/* inner */}
      <SlowWidget />                              {/* 3000ms */}
    </Suspense>
  </DashboardSection>
</Suspense>

{/* The outer boundary resolves when ALL children are done.
    The inner boundaries resolve independently of each other. */}`}</pre>
        </div>
      </section>

      <Separator />

      {/* ── SECTION 4: Error boundaries ─────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold mb-1">
            Example 3 — What happens when an async component throws?
          </h3>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              If an async component throws, the error bubbles up to the nearest{" "}
              <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">
                error.tsx
              </code>{" "}
              boundary in the route segment — not the Suspense boundary.
              Suspense only handles the{" "}
              <span className="font-medium">loading</span> state. Create an{" "}
              <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">
                error.tsx
              </code>{" "}
              file next to your{" "}
              <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">
                page.tsx
              </code>{" "}
              to catch and handle errors per-segment.
            </AlertDescription>
          </Alert>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              The component below always throws after 500ms
            </p>
            {/* This will trigger the nearest error.tsx */}
            <Suspense
              fallback={
                <Card>
                  <CardContent className="pt-4">
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              }
            >
              <BrokenComponent />
            </Suspense>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Create this file to handle it
            </p>
            <div className="bg-gray-950 text-green-400 font-mono text-xs rounded-lg p-4 h-full">
              <pre>{`// app/08-suspense/error.tsx
'use client' // error boundaries must be client components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <p>Something went wrong: {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}`}</pre>
            </div>
          </div>
        </div>

        <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
          <AlertDescription className="text-sm text-amber-800 dark:text-amber-200">
            <span className="font-medium">Key distinction: </span>
            <code className="bg-amber-200 dark:bg-amber-800 px-1 py-0.5 rounded font-mono text-xs">
              &lt;Suspense&gt;
            </code>{" "}
            handles the <span className="font-medium">pending</span> state
            (loading skeleton).{" "}
            <code className="bg-amber-200 dark:bg-amber-800 px-1 py-0.5 rounded font-mono text-xs">
              error.tsx
            </code>{" "}
            handles the <span className="font-medium">error</span> state
            (something went wrong). You need both for a resilient async UI.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* ── SECTION 5: Mental model summary ─────────────────────────────── */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold">
          The mental model in one table
        </h3>
        <Card>
          <CardContent className="pt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    State
                  </th>
                  <th className="text-left pb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    Who handles it
                  </th>
                  <th className="text-left pb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    How
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2.5">
                    <Badge variant="secondary" className="font-mono text-xs">
                      pending
                    </Badge>
                  </td>
                  <td className="py-2.5 font-mono text-xs">
                    &lt;Suspense fallback&gt;
                  </td>
                  <td className="py-2.5 text-sm text-muted-foreground">
                    Shows skeleton while async child resolves
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-mono text-xs">
                      fulfilled
                    </Badge>
                  </td>
                  <td className="py-2.5 font-mono text-xs">
                    the async component
                  </td>
                  <td className="py-2.5 text-sm text-muted-foreground">
                    Renders the real content, fallback is removed
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5">
                    <Badge variant="destructive" className="font-mono text-xs">
                      rejected
                    </Badge>
                  </td>
                  <td className="py-2.5 font-mono text-xs">error.tsx</td>
                  <td className="py-2.5 text-sm text-muted-foreground">
                    Catches throws, shows error UI with a reset option
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
