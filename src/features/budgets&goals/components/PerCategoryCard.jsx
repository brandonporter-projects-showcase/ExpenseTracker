import AppButton from "#components/common/AppButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "#components/ui/card";
import { Progress, ProgressValue } from "#components/ui/progress";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmDeleteBudget from "./ConfirmDeleteBudget";

export default function PerCategoryCard({
  children,
  budget,
  expense,
  fraction,
}) {
  const [showForm, setShowForm] = useState(false);
  return (
    <Card className="h-32 w-full py-4">
      <CardHeader className="gap-2">
        <CardTitle className="flex items-center justify-between">
          {children}
          <AppButton
            size="xs"
            variant="filled"
            className="flex size-6 min-w-fit"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <Trash2 className="size-3" />
          </AppButton>
        </CardTitle>
        <CardDescription>
          <Progress value={fraction} className="text-xs">
            <div className="flex w-full flex-nowrap justify-between">
              <span>
                ${expense} of ${budget}
              </span>
              <span>
                (<ProgressValue />)
              </span>
            </div>
          </Progress>
        </CardDescription>
      </CardHeader>
      {showForm && (
        <ConfirmDeleteBudget
          setShowDeleteForm={setShowForm}
          selectedBudgetCategory={children}
        />
      )}
    </Card>
  );
}
