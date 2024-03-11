import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex flex-col gap-2">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Konstantin&apos;s Blog
                </h1>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  The latest news, tips, and insights from the blog platform.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center gap-4 px-4 md:px-6">
            <Link
              className="grid gap-2 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-colors  dark:border-gray-800 dark:hover:shadow-md"
              href="/kostya/building-a-dynamic-blogging-platform-with-next-js-sql-turso-shadcn-ui-prisma-orm-and-type-script"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  Introducing the Blog Web Platform
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on June 24, 2023
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The complete platform for posting and sharing on the Web.
                Securely post, manage, and share your knowledge.
              </p>
            </Link>
            <Link
              className="grid gap-2 p-4 rounded-lg border border-gray-200  hover:shadow-md transition-colors  dark:border-gray-800 dark:hover:shadow-md"
              href="https://www.markdownguide.org/getting-started/#why-use-markdown"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  Write and Edit in Markdown
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on June 17, 2023
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Markdown is a lightweight markup language that you can use to
                add formatting elements to plaintext text documents. Created by
                John Gruber in 2004, Markdown is now one of the world&apos;s
                most popular markup languages.
              </p>
            </Link>
            <Link
              className="grid gap-2 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-colors  dark:border-gray-800 dark:hover:shadow-md"
              href="/kostya/getting-started-with-markdown"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Getting Started</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on June 10, 2023
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                An overview of Markdown, how it works, and what you can do with
                it.
              </p>
            </Link>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Blog Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
