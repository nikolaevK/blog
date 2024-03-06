"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface DeletePostInterface {
  postId: string;
  postUserId: string;
}

import authenticate from "./authenticate";

export async function deletePost(fields: DeletePostInterface) {
  const authenticated = await authenticate();
  if (!authenticated) throw new Error("Authentication failed");

  const { userId } = auth();
  const { postId, postUserId } = fields;

  if (userId !== postUserId) throw new Error("Not authorized");

  await prismadb.post.update({
    where: {
      id: postId,
    },
    data: {
      likes: {
        deleteMany: {},
      },
      comments: {
        deleteMany: {},
      },
    },
  });

  await prismadb.post.delete({
    where: {
      id: postId,
    },
  });

  redirect("/admin");
}
