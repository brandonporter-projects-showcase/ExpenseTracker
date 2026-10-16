import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "#components/ui/card";

export default function StatCard({ children, value = "loading" }) {
  return (
    <Card className="h-28 w-full min-w-0">
      <CardHeader className="w-full">
        <CardTitle className="flex items-center gap-2">{children}</CardTitle>
        <CardDescription>{value}</CardDescription>
      </CardHeader>
    </Card>
  );
}
