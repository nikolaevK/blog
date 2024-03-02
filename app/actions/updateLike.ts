"use server";

import prismadb from "@/lib/prismadb";
import { auth, clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateLike({
  postId,
  username,
  slug,
}: {
  postId: string;
  username: string;
  slug: string;
}) {
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  const like = await prismadb.like.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (like) {
    await prismadb.like.delete({ where: { id: like.id } });
  } else {
    await prismadb.like.create({
      data: {
        postId,
        userId,
      },
    });
  }

  revalidatePath(`/${username}/${slug}`);
  revalidatePath("/posts");
}
