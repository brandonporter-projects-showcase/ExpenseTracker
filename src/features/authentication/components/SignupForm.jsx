import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/AppButton";
import { EMAIL_REGEX } from "#lib/utils";
export default function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    reset,
    handleSubmit,
  } = useForm();
  const { signup, isPending } = useSignup();

  function onSubmit(data) {
    const names = data.name.trim().split(/\s+/);
    const firstName = names[0];
    const lastName = names.slice(1).join(" ");
    const fullName =
      `${firstName[0].toUpperCase() + firstName.slice(1)} ${lastName ? lastName[0].toUpperCase() + lastName.slice(1) : ""}`.trim();
    signup(
      { fullName, email: data.email, password: data.password },
      {
        onSuccess: () => reset(),
      },
    );
  }
  return (
    <form
      noValidate
      className={`mt-6 flex flex-col gap-6 ${isPending ? "animate-custom-pulse" : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          label="Full Name"
          disabled={isPending}
          error={errors.name}
          {...register("name", {
            required: "Full name is required",
            validate: (v) =>
              v.trim().split(/\s+/).length >= 2 ||
              "Please enter both your first and last name.",
          })}
        />
        <Input
          type="email"
          label="Email Address"
          disabled={isPending}
          error={errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Please provide a valid email address",
            },
          })}
        />
        <Input
          type="password"
          label="Password"
          disabled={isPending}
          error={errors.password}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (v) => {
              const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
              return (
                regex.test(v) ||
                "Must include uppercase, lowercase, and a number."
              );
            },
          })}
        />
        <Input
          type="password"
          label="Confirm Password"
          disabled={isPending}
          error={errors.confirmPass}
          {...register("confirmPass", {
            required: "Please confirm your password",
            validate: (v) =>
              v === getValues("password") || "Passwords do not match.",
          })}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={isPending} size="xs">
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </div>

      <p className="text-muted-foreground/70 text-center text-xs">
        Already have an account?{" "}
        <Link
          className="text-primary font-semibold hover:underline"
          to="/login"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
