"use server";

import { redirect } from "next/navigation";

import type { Provider } from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/server";

export const signInWithProvider = async (provider: Provider) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);

    return;
  }

  return { error };
};
