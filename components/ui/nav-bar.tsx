"use client";

import * as React from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./button";

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

export function NavBar() {
  const { userId } = useAuth();
  return (
    <>
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
                        href="/"
                      >
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components that you can copy and
                          paste into your apps. Accessible. Customizable. Open
                          Source.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
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

      {/* Todo: Separate Mobile into second component */}
      <nav>
        <section className="fixed block w-full top-0 z-10 md:hidden border-b bg-white dark:bg-secondary">
          <div className="flex items-center justify-between h-14 px-4 ">
            <div className="flex items-center justify-between gap-2 w-full">
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
          </div>
        </section>

        <section className="fixed block md:hidden bottom-0 w-full h-12 border-t z-10 bg-white dark:bg-secondary">
          <ul className="flex justify-between h-full items-center mx-6">
            {/* <Link href={`/${budgetId}`}>
              <LayoutDashboard
                className={cn(
                  "h-8 w-8",
                  pathname === `/${budgetId}`
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              />
            </Link>
            <Link href={`/${budgetId}/new-entry`}>
              <PlusSquare
                className={cn(
                  "h-8 w-8",
                  pathname === `/${budgetId}/new-entry`
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              />
            </Link>
            <Link href={`/${budgetId}/details`}>
              <BarChart3
                className={cn(
                  "h-8 w-8",
                  pathname === `/${budgetId}/details`
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              />
            </Link> */}
          </ul>
        </section>
      </nav>
    </>
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
