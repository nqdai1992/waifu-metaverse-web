import FormInput from "@/components/form-input/form-input";
import { signIn } from "@/features/authentication/sign-in.action";
import { signInSchema } from "@/features/authentication/validation";
import { CheckIcon } from "@radix-ui/react-icons";
import { Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Checkbox, Form } from "radix-ui";
import { useState } from "react";
import { z } from "zod";

const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    try {
      signInSchema.parse({ email, password });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as 'email' | 'password'] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});
    setServerError("");

    // Validate form
    if (validateForm()) {
      try {
        setIsLoading(true);

        // Call the sign-in action
        const { data, error } = await signIn({ email, password });

        if (error) {
          // Handle authentication error
          console.error("Authentication error:", error);

          // Display appropriate error message based on error code
          if (error.message.includes("Invalid login credentials")) {
            setServerError("Invalid email or password. Please try again.");
          } else if (error.message.includes("Email not confirmed")) {
            setServerError("Please verify your email before signing in.");
          } else {
            setServerError(error.message || "An error occurred during sign in. Please try again.");
          }
          return;
        }

        // Successful login
        if (data.user) {
          console.log("Successfully signed in:", data.user);
          // Redirect to home page
          router.push("/");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setServerError("An unexpected error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: undefined });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Text className="text-3xl text-white">Login to your account</Text>
        <Text className="text-base text-[#777E90]">
          Log in to continue your journey.
        </Text>
      </div>

      <Form.Root className="space-y-6" onSubmit={handleSubmit}>
        {/* Email Field */}
        <Form.Field name="email">
          <Form.Control asChild>
            <FormInput
              label="Email Address"
              type="email"
              placeHolder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Control>
          {errors.email && (
            <p className="text-[#FF3B30] text-sm mt-3">{errors.email}</p>
          )}
        </Form.Field>

        {/* Password Field */}
        <Form.Field name="password">
          <Form.Control asChild>
            <FormInput
              label="Password"
              type="password"
              placeHolder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Control>
          {errors.password && (
            <p className="text-[#FF3B30] text-sm mt-3">{errors.password}</p>
          )}
          {serverError && !errors.password && (
            <p className="text-[#FF3B30] text-sm mt-3">{serverError}</p>
          )}
        </Form.Field>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox.Root
              className="w-5 h-5 border border-[#333] rounded flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#5bbce3] data-[state=checked]:bg-[#5bbce3] data-[state=unchecked]:bg-[#0c0c10]"
              defaultChecked
              id="remember"
            >
              <Checkbox.Indicator>
                <CheckIcon className="text-black w-4 h-4" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor="remember" className="text-sm text-[#a0a0a0]">
              Remember for 30 days
            </label>
          </div>
          <Link href="/forgot-password" className="text-sm !text-[#4359A9]">
            Forgot password
          </Link>
        </div>

        <Form.Submit asChild>
          <button
            className="w-full font-medium bg-[#5bbce3] hover:bg-[#4aa9d0] text-black py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </Form.Submit>

        <button
          type="button"
          className="w-full flex items-center justify-center bg-transparent border border-[#333] text-white font-medium py-3 rounded-lg hover:bg-[#222] transition-colors gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          disabled={isLoading}
        >
          <Image
            src="/Google-icon.svg"
            alt="Google icon"
            width={24}
            height={24}
          />
          Sign In with Google
        </button>
        <div className="flex justify-center">
          <Text>Don&apos;t have an account?&ensp;</Text>
          <Link href="/sign-up" className="!text-[#4359A9]">
            Sign Up
          </Link>
        </div>
      </Form.Root>
    </>
  );
};

export default SignInForm;
