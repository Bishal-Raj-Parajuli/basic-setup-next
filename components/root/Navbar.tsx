import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { LogOutIcon, Menu, User } from "lucide-react";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

const Navbar = async ({ session }: { session: Session | null }) => {
  return (
    <nav className="w-full border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="logo-title">
            Basic Next App
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="nav-item">
              About
            </Link>
            {session && session.user ? (
              <>
                <Link href="/dashboard" className="nav-item">
                  <Button>Dashboard</Button>
                </Link>
                <Popover>
                  <PopoverTrigger>
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(session?.user?.name || "IN")}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-32 bg-background mt-2 border border-slate rounded-md p-2 shadow-lg text-sm">
                    <div className="flex flex-col">
                      <Button
                        variant="ghost"
                        className="hover:bg-slate-100"
                        onClick={async () => {
                          "use server";
                          redirect("/profile");
                        }}
                      >
                        <User className="w-5 mr-2" />
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="hover:bg-slate-100"
                        onClick={async () => {
                          "use server";
                          await signOut();
                          redirect("/");
                        }}
                      >
                        <LogOutIcon className="w-5 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Link href="/sign-in" className="nav-item">
                <Button>Sign-in</Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger aria-label="Open menu" className="h-10 w-10 p-2">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle>Basic Next App</SheetTitle>
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link href="/about" className="nav-item">
                    About
                  </Link>
                  {session && session.user ? (
                    <>
                      <Button
                        variant="ghost"
                        className="hover:bg-slate-100"
                        onClick={async () => {
                          "use server";
                          redirect("/profile");
                        }}
                      >
                        <User className="w-5 mr-2" />
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="hover:bg-slate-100"
                        onClick={async () => {
                          "use server";
                          await signOut();
                          redirect("/");
                        }}
                      >
                        <LogOutIcon className="w-5 mr-2" />
                        Logout
                      </Button>
                      <Link href="/dashboard" className="nav-item">
                        <Button className="w-full">Dashboard</Button>
                      </Link>
                    </>
                  ) : (
                    <Link href="/sign-in" className="nav-item">
                      <Button className="w-full">Sign-in</Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
