import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "#components/ui/item";
import ConfirmDeleteExpense from "@/features/expense/components/ConfirmDeleteExpense";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { Link, useLocation } from "react-router";

function ListItem({ expense, position }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const location = useLocation();
  return (
    <Item
      variant="outline"
      className="border-border/60 bg-primary/95 text-primary-foreground hover:border-primary/40 hover:bg-primary group shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <ItemHeader className="xs:flex grid grid-cols-1 justify-items-center">
        <ItemTitle className="xs:w-fit flex w-full items-center gap-2 text-sm font-bold">
          <span className="bg-primary-foreground/15 text-2xs flex size-[clamp(12px,10vw,48px)] items-center justify-center rounded-full font-bold">
            {position}
          </span>
          <div className="flex flex-col items-start">
            <span className="">{expense.category}</span>
            {expense.name !== expense.description ? (
              <span className="text-2xs text-primary-foreground/65 min-w-0">
                {expense.name}
              </span>
            ) : null}
          </div>
        </ItemTitle>

        <ItemDescription className="text-primary-foreground/75 text-xs font-semibold">
          ${expense.amount}
        </ItemDescription>
      </ItemHeader>

      <ItemContent className="xs:flex-row flex w-full flex-col items-center justify-between gap-4">
        <div className="bg-primary-foreground/10 flex min-w-0 max-w-full items-center gap-2 rounded-full px-3 py-1.5">
          <ItemTitle className="text-2xs text-primary-foreground/80 shrink-0 font-bold">
            Description:
          </ItemTitle>

          <ItemDescription className="text-2xs text-primary-foreground/70 min-w-0 truncate">
            {expense.description}
          </ItemDescription>
        </div>

        <ItemActions className="flex items-center gap-2 text-base">
          <Link to={`/app/expenses/${expense.id}${location.search}`}>
            <span className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-105">
              <MdModeEditOutline />
            </span>
          </Link>

          <span
            onClick={() => {
              setShowDeleteModal(true);
            }}
            className="bg-primary-foreground/10 text-primary-foreground hover:bg-destructive/15 hover:text-destructive flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-105"
          >
            <MdDeleteOutline />
          </span>
        </ItemActions>
      </ItemContent>
      {showDeleteModal && (
        <ConfirmDeleteExpense
          setShowDeleteForm={setShowDeleteModal}
          selectedExpenseId={expense.id}
        />
      )}
    </Item>
  );
}

export default ListItem;
