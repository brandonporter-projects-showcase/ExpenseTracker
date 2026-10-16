import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#components/ui/card";
import { Progress } from "#components/ui/progress";
import { Skeleton } from "#components/ui/skeleton";
import { Spinner } from "#components/ui/spinner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "#components/ui/table";
import { useOverviewPanelData } from "../hooks/useOverviewPanelData";

export default function OverviewPanel() {
  const { overviewData, isLoading } = useOverviewPanelData();
  return (
    <Card className="my-6 h-36 w-full justify-between gap-0 py-4">
      <CardHeader className="mb-4 px-4">
        <CardTitle>
          <Table>
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="h-4 text-xs sm:text-sm">
                  Budgeted
                </TableHead>
                <TableHead className="h-4 text-center text-xs sm:text-sm">
                  Spent
                </TableHead>
                <TableHead className="h-4 text-right text-xs sm:text-sm">
                  Remaining
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="h-6 overflow-hidden py-0 text-xs sm:text-sm">
                  {isLoading ? (
                    <Spinner className="mr-auto" />
                  ) : (
                    `$${overviewData.totalBudget}`
                  )}
                </TableCell>
                <TableCell className="h-6 overflow-hidden py-0 text-center text-xs sm:text-sm">
                  {isLoading ? (
                    <Spinner className="m-auto" />
                  ) : (
                    `$${overviewData.totalSpent}`
                  )}
                </TableCell>
                <TableCell
                  className={`h-6 overflow-hidden py-0 text-right text-xs sm:text-sm ${
                    overviewData.remaining < 0 && !isLoading
                      ? "text-destructive"
                      : ""
                  }`}
                >
                  {isLoading ? (
                    <Spinner className="ml-auto" />
                  ) : (
                    `$${overviewData.remaining}`
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        {isLoading ? (
          <Skeleton className="h-2 w-full rounded-full" />
        ) : (
          <Progress value={overviewData.fraction} id="budget-used" />
        )}
      </CardContent>
      <CardFooter className="px-4 text-xs">
        {isLoading ? (
          <Skeleton className="h-4 w-1/2" />
        ) : (
          <span>
            {overviewData.fraction === 0
              ? "No budget is set!"
              : `${overviewData.fraction}% of monthly budget used`}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
