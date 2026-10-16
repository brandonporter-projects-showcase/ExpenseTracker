import {
  Item,
  ItemGroup,
  ItemTitle,
  ItemDescription,
  ItemContent,
} from "#components/ui/item";
import { useSignout } from "@/features/authentication/hooks/useSignout";
import { useState } from "react";
import ProfileMenuItem from "#components/common/ProfileMenuItem";
import ChangeEmailModal from "./ChangeEmailModal";
import { LockKeyhole, LogOut, Mail, Palette, Trash } from "lucide-react";
import ChangePasswordModal from "./ChangePasswordModal";
import ThemeToggle from "./ThemeToggle";
import DeleteAccountModal from "./DeleteAccountModal";
import { useUser } from "../hooks/useUser";

export default function ProfileMenu() {
  const { isPending, signout } = useSignout();
  const { user } = useUser();
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const date = new Date(user?.created_at);
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
  return (
    <div className="mx-auto mt-4 w-full max-w-[650px]">
      <ItemGroup>
        <ProfileMenuItem
          onClick={signout}
          Icon={LogOut}
          className="hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
        >
          {isPending ? "Logging Out..." : "Logout"}
        </ProfileMenuItem>
        <ProfileMenuItem
          className="hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          onClick={() => setShowChangeEmail(true)}
          Icon={Mail}
        >
          Change Email
        </ProfileMenuItem>
        <ProfileMenuItem
          className="hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          onClick={() => setShowChangePassword(true)}
          Icon={LockKeyhole}
        >
          Change Password
        </ProfileMenuItem>
        <ProfileMenuItem
          className="hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          Icon={Palette}
        >
          <ThemeToggle />
        </ProfileMenuItem>
        <ProfileMenuItem
          className="hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
          onClick={() => setShowConfirmDelete(true)}
          Icon={Trash}
        >
          Delete Account
        </ProfileMenuItem>
        <Item variant="outline" size="sm">
          <ItemContent>
            <ItemTitle>Member Since:</ItemTitle>
            <ItemDescription>{formatted}</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
      {showChangeEmail && <ChangeEmailModal setShowForm={setShowChangeEmail} />}
      {showChangePassword && (
        <ChangePasswordModal setShowForm={setShowChangePassword} />
      )}
      {showConfirmDelete && (
        <DeleteAccountModal setShowForm={setShowConfirmDelete} />
      )}
    </div>
  );
}
