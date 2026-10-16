import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import Input from "../../../components/common/Input";
import AppButton from "../../../components/common/AppButton";
import { useLogin } from "../hooks/useLogin";
import { useLoginOAuth } from "../hooks/useLoginOAuth";
export default function LoginForm() {
  const { login, isPending } = useLogin();
  const { loginOAuth } = useLoginOAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  function onSubmit(data) {
    login(data, {
      onSuccess: () => reset(),
    });
  }
  return (
    <form
      noValidate
      className={`mt-6 flex flex-col gap-6 ${isPending ? "animate-custom-pulse" : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Input
          type="email"
          label="email"
          autoComplete="email"
          disabled={isPending}
          error={errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
        <Input
          type="password"
          label="password"
          autoComplete="current-password"
          disabled={isPending}
          error={errors.password}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </div>

      <div className="flex flex-col gap-3">
        <AppButton
          type="submit"
          disabled={isPending}
          size="xs"
          className="bg-primary py-5"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </AppButton>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="border-four w-full border-t"></span>
          </div>
          <div className="text-2xs relative flex justify-center uppercase">
            <span className="bg-background text-muted-foreground/50 px-2">
              Or continue with
            </span>
          </div>
        </div>

        <AppButton
          type="button"
          size="xs"
          className="border-muted active:scale-98 text-primary-foreground/75 bg-primary hover:bg-primary/80 flex items-center justify-center gap-3 rounded-full border py-5 font-medium transition-all"
          onClick={loginOAuth}
        >
          <FcGoogle className="size-4" />
          Google
        </AppButton>
      </div>

      <p className="text-muted-foreground/70 text-center text-xs">
        Don't have an account?{" "}
        <Link
          className="text-primary font-semibold hover:underline"
          to="/signup"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
