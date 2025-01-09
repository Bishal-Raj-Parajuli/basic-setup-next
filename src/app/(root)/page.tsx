import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function RootPage() {
  return (
    <main className="w-full h-screen">
      <div className="h-full space-y-5 flex flex-col justify-center items-center">
        <h3 className="text-l">Hello User 👋</h3>
        <h1 className="text-3xl font-bold">Basic Next App</h1>
        <div className="space-x-2">
          <Button>
            <Link href="/login">Login</Link>
          </Button>
          <Button>
            <Link href="/signup">Signup</Link>
          </Button>
          <Button>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
