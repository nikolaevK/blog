"use client";

import Link from "next/link";

import {
  FolderIcon,
  HomeIcon,
  Package2Icon,
  PlusSquareIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {};

export default function DashboardSideBar({}: Props) {
  const pathname = usePathname();
  return (
    <div className="bg-primary-100/40 px-4 py-6 w-[240px] dark:bg-gray-800/40 hidden md:block ">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 font-semibold">
          <Package2Icon className="h-6 w-6" />
          <span className="">Dashboard</span>
        </div>
      </div>
      <nav className="grid gap-1.5 mt-6 text-sm font-medium">
        <Link
          className={`flex items-center gap-3 rounded-lg ${
            pathname === "/admin" && "bg-gray-100 dark:bg-gray-800"
          } px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50`}
          href="/admin"
        >
          <HomeIcon className="h-4 w-4" />
          Home
        </Link>
        <Link
          className={`flex items-center gap-3 rounded-lg ${
            pathname === "/admin/create-blog" && "bg-gray-100 dark:bg-gray-800"
          } px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50`}
          href="/admin/create-blog"
        >
          <PlusSquareIcon className="h-4 w-4" />
          Create
        </Link>
      </nav>
    </div>
  );
}
