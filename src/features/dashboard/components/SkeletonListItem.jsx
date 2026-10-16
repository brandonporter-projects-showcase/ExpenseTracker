import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "#components/ui/item";
import { Skeleton } from "#components/ui/skeleton";

function SkeletonListItem() {
  return (
    <Item variant="outline" className="w-full shadow-sm">
      <ItemHeader className="xs:flex grid grid-cols-1 justify-items-center">
        <ItemTitle className="xs:w-fit flex w-full items-center gap-2">
          <Skeleton className="aspect-square size-[clamp(14px,10vw,48px)] rounded-full" />
          <div className="flex w-full flex-col gap-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2 w-28 opacity-70" />
          </div>
        </ItemTitle>

        <Skeleton className="h-4 w-14" />
      </ItemHeader>
      <ItemContent className="xs:flex-row flex w-full flex-col items-center justify-between gap-4">
        <div className="flex w-full items-center gap-2 rounded-full px-3 py-1.5">
          <Skeleton className="h-2 w-20 shrink-0" />
          <Skeleton className="h-2 flex-1" />
        </div>
        <ItemActions className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </ItemActions>
      </ItemContent>
    </Item>
  );
}

export default SkeletonListItem;
