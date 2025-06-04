import FormInput from "@/components/authen-flow/form-input/form-input";
import { signup } from "@/features/authentication/sign-up.action";
import { signInWithProvider } from "@/features/authentication/sign-in-with-provider.action";
import { signUpSchema } from "@/features/authentication/validation";
import { Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "radix-ui";
import { useState, useEffect } from "react";
import { z } from "zod";

// Color constants - used for consistent styling
const COLORS = {
  ERROR: "#FF3B30",
  PRIMARY: "#5bbce3",
  PRIMARY_HOVER: "#4aa9d0",
  BORDER: "#333",
  HOVER_BG: "#222",
  LINK: "#4359A9",
  TEXT_SECONDARY: "#777E90",
};

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Check for OAuth errors in URL parameters
  useEffect(() => {
    try {
      const error = searchParams?.get('error');
      if (error === 'oauth_error') {
        setServerError('Google sign-up failed. Please try again or use email/password.');
      }
    } catch {
      // Ignore errors in test environment where searchParams might not be available
    }
  }, [searchParams]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Clear error when user starts typing
    if (errors.password) {
      setErrors({ ...errors, password: undefined });
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    // Clear error when user starts typing
    if (errors.confirmPassword) {
      setErrors({ ...errors, confirmPassword: undefined });
    }
  };

  const validateForm = () => {
    try {
      signUpSchema.parse({ email, password, confirmPassword });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { email?: string; password?: string; confirmPassword?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as 'email' | 'password' | 'confirmPassword'] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear previous errors
    setServerError("");

    // Validate form
    if (validateForm()) {
      try {
        setIsLoading(true);

        // Call the sign-up action
        const { error } = await signup({
          email,
          password,
          displayName: email.split('@')[0], // Use part of email as display name
        });

        if (error) {
          // Handle authentication error
          console.error("Authentication error:", error);
          setServerError(error.message || "An error occurred during sign up. Please try again.");
          return;
        }

        // Store the email in sessionStorage for use in the verification page
        try {
          sessionStorage.setItem("userEmail", email);
        } catch (storageError) {
          console.warn("Could not store email in sessionStorage:", storageError);
          // Continue even if storage fails - not critical
        }

        // Redirect to verify email page on success
        router.push("/verify-email");
      } catch (error) {
        console.error("Sign up error:", error);
        setServerError("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true);
      setServerError(""); // Clear any existing errors

      // Call the OAuth sign-in action with Google provider
      // Note: For OAuth, sign-up and sign-in use the same flow
      await signInWithProvider("google");

      // Note: If successful, the user will be redirected to Google OAuth
      // and then back to our callback URL, so we won't reach this point
    } catch (error) {
      console.error("Google sign-up error:", error);
      setServerError("Failed to initiate Google sign-up. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Text className="text-3xl text-white">Create an account</Text>
        <Text className={`text-base text-[${COLORS.TEXT_SECONDARY}]`}>
          Create an account and be part of something amazing.
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
            <p className={`text-[${COLORS.ERROR}] text-sm mt-3`}>{errors.email}</p>
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
            <p className={`text-[${COLORS.ERROR}] text-sm mt-3`}>{errors.password}</p>
          )}
        </Form.Field>

        {/* Confirm Password Field */}
        <Form.Field name="confirmPassword">
          <Form.Control asChild>
            <FormInput
              label="Confirm Password"
              type="password"
              placeHolder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Control>
          {errors.confirmPassword && (
            <p className={`text-[${COLORS.ERROR}] text-sm mt-3`}>{errors.confirmPassword}</p>
          )}
          {serverError && !errors.confirmPassword && (
            <p className={`text-[${COLORS.ERROR}] text-sm mt-3`}>{serverError}</p>
          )}
        </Form.Field>

        <div className="flex flex-col gap-4.5">
          <Form.Submit asChild>
            <button
              className={`w-full font-medium bg-[${COLORS.PRIMARY}] hover:bg-[${COLORS.PRIMARY_HOVER}] text-black py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed`}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </Form.Submit>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className={`w-full flex items-center justify-center bg-transparent border border-[${COLORS.BORDER}] text-white font-medium py-3 rounded-lg hover:bg-[${COLORS.HOVER_BG}] transition-colors gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
            disabled={isLoading || isGoogleLoading}
          >
            <Image
              src="/google-icon.svg"
              alt="Google icon"
              width={24}
              height={24}
            />
            {isGoogleLoading ? "Signing Up with Google..." : "Sign Up with Google"}
          </button>
          <div className="flex justify-center">
            <Text className={`text-[${COLORS.TEXT_SECONDARY}]`}>Do you have an account?&ensp;</Text>
            <Link href="/sign-in" className={`!text-[${COLORS.LINK}]`}>
              Sign In
            </Link>
          </div>
        </div>
      </Form.Root>
    </>
  );
};

export default SignUpForm;
