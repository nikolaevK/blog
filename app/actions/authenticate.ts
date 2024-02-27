"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export default async function authenticate() {
  const { userId } = auth();

  const user = await prismadb.user.findFirst({
    where: {
      id: userId ? userId : undefined,
    },
  });

  return user && userId ? true : false;
}
