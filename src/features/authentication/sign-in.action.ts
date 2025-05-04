"use server";

import { createClient } from "@/utils/supabase/server";

interface SignInParams {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: SignInParams) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};
