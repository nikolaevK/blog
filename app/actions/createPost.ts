"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const kebabCase = require("lodash.kebabcase");

import { CreatePostFormType } from "../admin/create-blog/components/create-post-form";
import authenticate from "./authenticate";

export async function createPost(fields: CreatePostFormType) {
  const authenticated = await authenticate();
  if (!authenticated) throw new Error("Authentication failed");

  const { userId } = auth();
  const { content, published, title } = fields;

  const slug = encodeURI(kebabCase(title));

  const user = await prismadb.user.findFirst({
    where: {
      id: userId!,
    },
  });

  const post = await prismadb.post.create({
    data: {
      userId: userId!,
      content,
      published,
      slug,
      title,
      username: user!.userName,
    },
  });

  //   TODO: redirect to admin posts and revalidateother paths which render posts
  redirect(`/${user?.userName}/${post.slug}`);
}
