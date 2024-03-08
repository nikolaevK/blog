"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { HomeIcon, LayoutDashboard, ScrollText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import AdminDropdownMenuMobile from "./admin-dropdown-menu-mobile";

import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";

export default function MobileNavBar({ authorized }: { authorized: boolean }) {
  const pathname = usePathname();
  return (
    <nav>
      <section className="fixed block w-full top-0 z-10 md:hidden border-b bg-white dark:bg-secondary">
        <div className="flex items-center justify-between h-14 px-4 ">
          <div
            className={`flex items-center ${
              pathname.includes("/admin") ? "justify-between" : "justify-end"
            } gap-2 w-full`}
          >
            {authorized && pathname.includes("/admin") && (
              <AdminDropdownMenuMobile />
            )}
            <div className="flex justify-center items-center gap-2">
              <ModeToggle />
              <UserButton afterSignOutUrl="/sign-in" />
              {!authorized && (
                <Link href="/sign-in">
                  <Button variant="link" className="p-0">
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="fixed block md:hidden bottom-0 w-full h-12 border-t z-10 bg-white dark:bg-secondary">
        <ul className="flex justify-between h-full items-center mx-6">
          <Link href="/">
            <HomeIcon
              className={cn(
                "h-8 w-8",
                pathname === "/"
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            />
          </Link>
          <Link href="/posts">
            <ScrollText
              className={cn(
                "h-8 w-8",
                pathname === "/posts"
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            />
          </Link>
          {authorized && (
            <Link href="/admin">
              <LayoutDashboard
                className={cn(
                  "h-8 w-8",
                  pathname.includes("admin")
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              />
            </Link>
          )}
        </ul>
      </section>
    </nav>
  );
}
