"use server";

import prismadb from "@/lib/prismadb";
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function createUser(username: string) {
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  if (!username) throw new Error("Username is required");

  const { imageUrl } = await clerkClient.users.getUser(userId);

  await prismadb.user.create({
    data: {
      id: userId,
      userName: username,
      imageUrl,
    },
  });

  redirect("/admin");
}
