import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
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
            <Link href="/sign-in" className="nav-item">
              <Button>Sign-in</Button>
            </Link>
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
                  <Link href="/sign-in" className="nav-item">
                    <Button className="w-full">Sign-in</Button>
                  </Link>
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
