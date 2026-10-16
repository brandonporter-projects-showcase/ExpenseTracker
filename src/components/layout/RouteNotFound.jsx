import { Link } from "react-router";
import AppButton from "#components/common/AppButton";
import Heading from "#components/common/Heading";
import { IoWarningOutline } from "react-icons/io5";

export default function RouteNotFound() {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center gap-6 p-6">
      <div className="relative mb-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary/10 size-32 animate-pulse rounded-full" />
        </div>
      </div>

      <Heading
        as="h1"
        className="text-destructive flex items-center gap-2 text-[64px] font-bold leading-none tracking-tight"
        customStyles={true}
      >
        <IoWarningOutline />
        404
        <IoWarningOutline />
      </Heading>

      <div className="bg-primary/30 h-1 w-12 rounded-full" />

      <div className="max-w-md space-y-1 text-center">
        <Heading
          as="h2"
          className="text-foreground text-xl font-semibold"
          customStyles={true}
        >
          Oops! The page you entered doesn't exist
        </Heading>
        <p className="text-muted-foreground text-sm">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </div>

      <div className="mt-2 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
        <Link to="/app/home" className="flex-1">
          <AppButton
            size="xl"
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full gap-2"
          >
            Get outta here!
          </AppButton>
        </Link>
      </div>
    </div>
  );
}
