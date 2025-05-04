"use server";
import { createClient } from "@/utils/supabase/server";

interface SignupParams {
  email: string;
  password: string;
  displayName: string;
}

export const signup = async ({
  email,
  password,
  displayName,
}: SignupParams) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        displayName,
      },
    },
  });

  return { data, error };
};
