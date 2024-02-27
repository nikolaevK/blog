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
import UserProfile from "./components/user-profile";
import UsersPosts from "./components/users-posts";

type Props = {};

export default async function UsersPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const [posts, user] = await Promise.all([
    await prismadb.post.findMany({
      where: {
        username,
      },
    }),
    prismadb.user.findFirst({
      where: {
        userName: username,
      },
    }),
  ]);
  return (
    <section className="p-6">
      <Card>
        <CardHeader>{user && <UserProfile user={user} />}</CardHeader>
        <CardContent>
          <UsersPosts posts={posts} user={user!} />
        </CardContent>
      </Card>
    </section>
  );
}
