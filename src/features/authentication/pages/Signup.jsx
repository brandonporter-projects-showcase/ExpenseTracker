import Heading from "../../../components/common/Heading";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <main className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-8">
      <div className="bg-primary/5 pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full blur-3xl"></div>
      <div className="bg-secondary/10 pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl"></div>

      <img
        src="/Logo.png"
        alt="Background Logo"
        className="pointer-events-none absolute inset-0 m-auto h-2/3 w-2/3 select-none object-contain opacity-[0.03]"
      />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Heading as="h1" className="mb-2">
            Create Account
          </Heading>
          <p className="text-muted-foreground/60 font-medium">
            Join us to start tracking your expenses
          </p>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
