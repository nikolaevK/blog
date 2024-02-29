import prismadb from "@/lib/prismadb";
import BlogPost from "./components/blog-post";

export default async function PostPage({
  params: { username, slug },
}: {
  params: { username: string; slug: string };
}) {
  const [post, user] = await Promise.all([
    await prismadb.post.findFirst({
      where: {
        slug,
        username,
      },
    }),
    await prismadb.user.findFirst({
      where: {
        userName: username,
      },
    }),
  ]);

  if (!post || !user)
    return <div>{`${username} or ${slug} post does not exist`}</div>;

  return (
    <div className="mb-12 md:mb-0">
      <BlogPost post={post} user={user} />
    </div>
  );
}
