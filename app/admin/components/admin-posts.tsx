import PostCard from "@/components/ui/post-card";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import React from "react";

export default async function AdminPosts() {
  const { userId } = auth();
  if (!userId) return null;

  const [posts, user] = await Promise.all([
    await prismadb.post.findMany({
      where: {
        userId,
      },
    }),
    prismadb.user.findFirst({
      where: {
        id: userId,
      },
    }),
  ]);

  return (
    <div className="flex flex-col gap-4 px-6">
      {posts.map((post) => (
        <PostCard post={post} user={user!} key={post.id} />
      ))}
    </div>
  );
}
