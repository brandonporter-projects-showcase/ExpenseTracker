import Heading from "../../../components/common/Heading";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <main className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-8">
      <div className="bg-primary/5 pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"></div>
      <div className="bg-secondary/10 pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl"></div>

      <img
        src="/Logo2.png"
        alt="Background Logo"
        className="pointer-events-none absolute inset-0 m-auto size-1/3 select-none rounded-full object-contain opacity-[0.3]"
      />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Heading as="h1" className="mb-2">
            Welcome Back!
          </Heading>
          <p className="text-muted-foreground/60 font-medium">
            Please sign in to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
