// Component Imports

// Util Imports
import GuestOnlyRoute from "@/features/authentication/hoc/guest-only-route";
import { PropsWithChildren } from "react";

const Layout = async (props: PropsWithChildren) => {
  const { children } = props;

  return <GuestOnlyRoute>{children}</GuestOnlyRoute>;
};

export default Layout;
