"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function createUser(username: string) {
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  if (!username) throw new Error("Username is required");

  const user = await prismadb.user.create({
    data: {
      id: userId,
      userName: username,
    },
  });

  redirect("/");
}
