import Heading from "./Heading";
import { useUser } from "../../features/profile/hooks/useUser";

export default function HomeHeader() {
  const { user } = useUser();
  const fullName = user?.user_metadata?.fullName || "Guest";

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col">
        <span className="text-primary text-xs font-medium uppercase tracking-wider">
          Welcome
        </span>
        <Heading as="h3" className="text-secondary leading-tight">
          {fullName}
        </Heading>
      </div>
    </div>
  );
}
