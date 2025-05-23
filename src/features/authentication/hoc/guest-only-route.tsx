"use client";

// Next Imports
import { PropsWithChildren, useEffect } from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "@/utils/supabase/server";

// Config Imports


const GuestOnlyRoute = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getServerSession();

      if (session) {
        redirect("/");
      }
    };

    fetchSession();
  }, []);

  return <>{children}</>;
};

export default GuestOnlyRoute;
