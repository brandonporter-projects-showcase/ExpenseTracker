import { Link } from "react-router";
import Button from "../../../components/common/AppButton";
import Heading from "../../../components/common/Heading";
import Logo from "../../../components/common/Logo";
export default function Onboarding() {
  return (
    <div className="bg-background relative flex min-h-screen w-full flex-col justify-between overflow-hidden p-8 sm:p-7">
      <div className="bg-primary/5 absolute -left-40 -top-40 h-80 w-80 rounded-full blur-3xl"></div>
      <div className="bg-secondary/10 absolute -right-20 top-1/2 h-60 w-60 rounded-full blur-3xl"></div>

      <header className="relative z-10 flex justify-center py-12">
        <Logo size="lg" />
      </header>

      <main className="relative z-10 mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-8 py-4 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-5 space-y-4 duration-700">
          <Heading as="h1" className="text-lg leading-tight">
            Spend Smarter With Our Expense Tracker
          </Heading>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed">
            Master your finances with ease. Track every penny and reach your
            financial goals faster than ever.
          </p>
        </div>
      </main>

      <footer className="relative z-10 mx-auto flex w-full max-w-sm flex-col items-center gap-8 pb-8">
        <div className="animate-in fade-in slide-in-from-bottom-5 w-full space-y-4 duration-700">
          <Link className="block w-full" to="/signup">
            <Button
              size="sm"
              className="shadow-primary/20 w-full cursor-pointer tracking-wide shadow-xl"
            >
              Get Started
            </Button>
          </Link>
          <p className="text-muted-foreground text-2xs text-center font-semibold uppercase tracking-wide">
            Already Have Account?
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 ml-2 underline decoration-2 underline-offset-4 transition-all"
            >
              Log In
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
