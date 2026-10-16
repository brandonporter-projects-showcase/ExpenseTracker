import { Item, ItemMedia, ItemActions } from "#components/ui/item";

export default function ProfileMenuItem({
  onClick,
  children,
  className,
  Icon,
}) {
  return (
    <Item variant="outline" size="sm" className={className} onClick={onClick}>
      <div className="flex w-full cursor-pointer gap-4">
        <ItemMedia variant="icon">
          <Icon className="size-4" />
        </ItemMedia>
        <ItemActions className="w-full">{children}</ItemActions>
      </div>
    </Item>
  );
}
