import { auth } from "@/auth";
import Navbar from "@/components/root/Navbar";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <main>
      <Navbar session={session} />
      {children}
    </main>
  );
};

export default Layout;
