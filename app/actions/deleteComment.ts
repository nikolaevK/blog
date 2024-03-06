"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import authenticate from "./authenticate";

interface CommentInterface {
  postId: string;
  commentId: string;
  owner: string;
}

export async function deleteComment(fields: CommentInterface) {
  const authenticated = await authenticate();
  if (!authenticated) throw new Error("Authentication failed");

  const { userId } = auth();
  const { owner, postId, commentId } = fields;

  if (owner !== userId) throw new Error("Not Authorized");

  const [comment, post] = await Promise.all([
    await prismadb.comment.delete({
      where: {
        id: commentId,
      },
    }),
    await prismadb.post.findFirst({
      where: {
        id: postId,
      },
    }),
  ]);

  revalidatePath(`/${post?.username}/${post?.slug}`);
  revalidatePath(`/${post?.username}`);
  revalidatePath("/posts");
  revalidatePath("/admin");
}
