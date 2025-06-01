"use client";

// Next Imports
import { redirect, usePathname } from "next/navigation";

const AuthRedirect = () => {
  const pathname = usePathname();

  const redirectUrl = `/sign-in?redirectTo=${pathname}`;
  const login = `/sign-in`;

  return redirect(pathname === login ? login : redirectUrl);
};

export default AuthRedirect;
