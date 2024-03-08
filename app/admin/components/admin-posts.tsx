import PostCard from "@/components/ui/post-card";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export default async function AdminPosts() {
  const { userId } = auth();
  if (!userId) return null;

  const posts = await prismadb.post.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="flex flex-col gap-4 px-4">
      {posts.map((post) => (
        <PostCard post={post} user={post.user} key={post.id} />
      ))}
    </div>
  );
}
