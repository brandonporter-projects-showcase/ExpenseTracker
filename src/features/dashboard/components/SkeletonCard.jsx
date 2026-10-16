import { Skeleton } from "#components/ui/skeleton";
import { Card, CardHeader } from "#components/ui/card";
export default function SkeletonCard() {
  return (
    <Card className="h-28 w-full min-w-0">
      <CardHeader className="gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
    </Card>
  );
}
