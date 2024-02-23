"use client";
import {
  Cloud,
  CreditCard,
  Github,
  HomeIcon,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  PlusSquareIcon,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

export default function AdminDropdownMenuMobile({}: Props) {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Admin</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              className={`w-full flex items-center gap-3 rounded-lg ${
                pathname === "/admin" && "bg-gray-100 dark:bg-gray-800"
              } px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50`}
              href="/admin"
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className={`w-full flex items-center gap-3 rounded-lg ${
                pathname === "/admin/create-blog" &&
                "bg-gray-100 dark:bg-gray-800"
              } px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50`}
              href="/admin/create-blog"
            >
              <PlusSquareIcon className="h-4 w-4" />
              Create
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
