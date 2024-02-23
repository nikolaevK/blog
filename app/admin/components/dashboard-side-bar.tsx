import Link from "next/link";

import {
  FolderIcon,
  HomeIcon,
  Package2Icon,
  PackageIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";

type Props = {};

export default function DashboardSideBar({}: Props) {
  return (
    <div className="border-r bg-primary-100/40 px-4 py-6 w-[240px] dark:bg-gray-800/40 hidden md:block">
      <div className="flex items-center justify-center">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="">Dashboard</span>
        </Link>
      </div>
      <nav className="grid gap-1.5 mt-6 text-sm font-medium">
        <Link
          className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
          href="#"
        >
          <HomeIcon className="h-4 w-4" />
          Home
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="#"
        >
          <PackageIcon className="h-4 w-4" />
          Posts
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="#"
        >
          <UsersIcon className="h-4 w-4" />
          Authors
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="#"
        >
          <TagIcon className="h-4 w-4" />
          Tags
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="#"
        >
          <FolderIcon className="h-4 w-4" />
          Categories
        </Link>
      </nav>
    </div>
  );
}
