import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PostCard from "@/components/ui/post-card";
import prismadb from "@/lib/prismadb";
import { Post, Prisma } from "@prisma/client";

export default async function PostsPage() {
  const posts = await prismadb.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  return (
    <div className="p-4 md:p-6 mb-12 md:mb-0">
      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>Users published posts</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-3 md:px-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard post={post} user={post.user} key={post.id} />
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              No posts yet...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
