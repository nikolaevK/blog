"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function checkUsernameAvailability(username: string) {
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  if (!username) throw new Error("Username is required");

  const user = await prismadb.user.findUnique({
    where: {
      userName: username,
    },
  });

  return user;
}
