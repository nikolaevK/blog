"use client";

import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export default function NonMobileNavBar({
  authorized,
}: {
  authorized: boolean;
}) {
  const { userId } = useAuth();
  return (
    <nav className="hidden md:flex justify-between items-center p-4 ">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/kostya/building-a-dynamic-blogging-platform-with-next-js-sql-turso-shadcn-ui-prisma-orm-and-type-script"
                    >
                      {/* <Icons.logo className="h-6 w-6" /> */}
                      <div className="mb-2 mt-4 text-lg font-medium">
                        The Platform
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Building a Dynamic Blogging Platform with Next.js, SQL,
                        Turso, shadcn/ui, Prisma ORM, and TypeScript.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="/kostya/getting-started-with-markdown"
                  title="How To Use"
                >
                  Learn how to write your first blog post.
                </ListItem>
                <ListItem
                  href="https://www.markdownguide.org/getting-started/#why-use-markdown"
                  title="Markdown"
                >
                  How to install dependencies and structure your app.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/posts" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Posts
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {authorized && (
            <NavigationMenuItem>
              <Link href="/admin" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex justify-center items-center gap-3">
        <ModeToggle />
        <UserButton afterSignOutUrl="/sign-in" />
        {!userId && (
          <Link href="/sign-in">
            <Button variant="link" className="p-0">
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const components: { title: string; href: string; description: string }[] = [
  // {
  //   title: "Alert Dialog",
  //   href: "/docs/primitives/alert-dialog",
  //   description:
  //     "A modal dialog that interrupts the user with important content and expects a response.",
  // },
  // {
  //   title: "Hover Card",
  //   href: "/docs/primitives/hover-card",
  //   description:
  //     "For sighted users to preview content available behind a link.",
  // },
  // {
  //   title: "Progress",
  //   href: "/docs/primitives/progress",
  //   description:
  //     "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  // },
  // {
  //   title: "Scroll-area",
  //   href: "/docs/primitives/scroll-area",
  //   description: "Visually or semantically separates content.",
  // },
  // {
  //   title: "Tabs",
  //   href: "/docs/primitives/tabs",
  //   description:
  //     "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  // },
  // {
  //   title: "Tooltip",
  //   href: "/docs/primitives/tooltip",
  //   description:
  //     "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  // },
];
