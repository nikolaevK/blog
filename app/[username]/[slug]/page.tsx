import prismadb from "@/lib/prismadb";
import BlogPost from "./components/blog-post";

export default async function PostPage({
  params: { username, slug },
}: {
  params: { username: string; slug: string };
}) {
  const post = await prismadb.post.findFirst({
    where: {
      slug,
      username,
    },
  });
  return (
    <div>
      <BlogPost post={post!} />
    </div>
  );
}
