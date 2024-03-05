"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import authenticate from "./authenticate";

interface CommentInterface {
  postId: string;
  comment: string;
}

export async function createComment(fields: CommentInterface) {
  const authenticated = await authenticate();
  if (!authenticated) throw new Error("Authentication failed");

  const { userId } = auth();
  const { comment, postId } = fields;

  const [user, post] = await Promise.all([
    prismadb.user.findUnique({
      where: {
        id: userId!,
      },
    }),
    prismadb.post.findFirst({
      where: {
        id: postId,
      },
    }),
  ]);

  await prismadb.comment.create({
    data: {
      userId: userId!,
      comment,
      username: user!.userName,
      photoUrl: user!.imageUrl,
      postId,
    },
  });

  revalidatePath(`/${user?.userName}/${post?.slug}`);
  revalidatePath(`/${user?.userName}`);
  revalidatePath("/posts");
  revalidatePath("/admin");
}
