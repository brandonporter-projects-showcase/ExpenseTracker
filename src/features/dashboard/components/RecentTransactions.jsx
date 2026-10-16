import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "#components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRecentTransactions } from "../hooks/useRecentTransactions";
import { Skeleton } from "#components/ui/skeleton";

export default function RecentTransactions() {
  const { isLoading, recentTransactions } = useRecentTransactions();
  return (
    <Card className="mx-auto aspect-auto w-full justify-start gap-4 overflow-visible [--card-spacing:--spacing(4)] sm:gap-5 sm:[--card-spacing:--spacing(6)] lg:gap-6 lg:[--card-spacing:--spacing(8)]">
      <CardHeader className="items-center">
        <CardTitle className="text-base">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center px-4 py-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-10 w-[120px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-10 w-[90px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-10 w-[70px]" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-10 w-[60px]" />
                    </TableCell>
                  </TableRow>
                ))
              : recentTransactions.map((tran) => {
                  return (
                    <TableRow key={tran.id}>
                      <TableCell className="font-medium">{tran.name}</TableCell>
                      <TableCell>{tran.category}</TableCell>
                      <TableCell className="text-primary">
                        {tran.price}
                      </TableCell>
                      <TableCell className="text-right">{tran.date}</TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
