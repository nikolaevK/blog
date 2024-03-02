"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const kebabCase = require("lodash.kebabcase");
import { UpdatePostFormType } from "../admin/edit-post/[slug]/components/update-post-form";

interface UpdatePostInterface extends UpdatePostFormType {
  postId: string;
  postUserId: string;
  username: string;
}

import authenticate from "./authenticate";

export async function updatePost(fields: UpdatePostInterface) {
  const authenticated = await authenticate();
  if (!authenticated) throw new Error("Authentication failed");

  const { userId } = auth();
  const { content, published, title, postId, postUserId, username } = fields;

  if (userId !== postUserId) throw new Error("Not authorized");

  const slug = encodeURI(kebabCase(title));

  const post = await prismadb.post.update({
    where: {
      id: postId,
    },
    data: {
      content,
      title,
      slug,
      published,
    },
  });

  //   TODO: redirect to admin posts and revalidateother paths which render posts
  redirect(`/${username}/${post.slug}`);
}
