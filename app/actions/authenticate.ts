"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function authenticate() {
  const { userId } = auth();

  const user = await prismadb.user.findFirst({
    where: {
      id: userId ? userId : undefined,
    },
  });

  if (userId && !user) redirect("/register");

  return user && userId ? true : false;
}
