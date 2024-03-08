import { Card, CardContent, CardHeader } from "@/components/ui/card";

import prismadb from "@/lib/prismadb";
import UserProfile from "./components/user-profile";
import UsersPosts from "./components/users-posts";

export default async function UsersPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const [user, posts] = await Promise.all([
    await prismadb.user.findFirst({
      where: {
        userName: username,
      },
    }),
    await prismadb.post.findMany({
      where: {
        username,
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    }),
  ]);

  if (!user) return <div>{`${username} does not exist`}</div>;

  return (
    <section className="p-2 md:p-6 mb-14 md:mb-0">
      <Card>
        <CardHeader>{user && <UserProfile user={user} />}</CardHeader>
        <CardContent>
          <UsersPosts posts={posts} user={user} />
        </CardContent>
      </Card>
      {posts.length === 0 && (
        <Card className="mt-4 ">
          <CardContent className="text-muted-foreground text-lg md:text-xl flex items-center justify-center p-4">
            <p>User did not publish anything yet.</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
