import AppHeaderLayout from "#components/layout/AppHeaderLayout";
import { HiOutlineUser } from "react-icons/hi2";
import { useUser } from "../hooks/useUser";

export default function ProfileHeading() {
  const { user } = useUser();
  const fullName = user?.user_metadata?.fullName;
  const email = user.email.split("@").at(0);
  return (
    <AppHeaderLayout>
      <HiOutlineUser className="text-primary p-2 text-8xl" />
      <span>{fullName}</span>
      <span className="text-primary text-xs">{email}</span>
    </AppHeaderLayout>
  );
}
