"use server";

import { createClient } from "@/utils/supabase/server";

interface VerifyOtpParams {
  email: string;
  token: string;
}

/**
 * Verifies an email confirmation OTP code
 * 
 * @param email The email address associated with the OTP
 * @param token The 6-digit OTP code entered by the user
 * @returns Object containing data and error properties
 */
export const verifyConfirmationOtp = async ({ email, token }: VerifyOtpParams) => {
  try {
    const supabase = await createClient();

    // Verify the OTP code using Supabase's verifyOtp method
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email' // 'email' type is used for email verification
    });

    if (error) {
      console.error("OTP verification error:", error);
      return { 
        data: null, 
        error: { 
          message: error.message || "Failed to verify email. Please try again or request a new code." 
        } 
      };
    }

    // If verification is successful, update the user's verification status
    // This is handled automatically by Supabase, but we can add additional logic here if needed
    // For example, we could update a custom field in the user's profile

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error during OTP verification:", error);
    return { 
      data: null, 
      error: { 
        message: "An unexpected error occurred. Please try again later." 
      } 
    };
  }
};
