import prismadb from "@/lib/prismadb";
import BlogPost from "./components/blog-post";
import CommentsSection from "./components/comments-section";

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
    include: {
      user: true,
      likes: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
      },

      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  if (!post) return <div>{`${slug} post does not exist`}</div>;

  return (
    <div className="mb-16">
      <BlogPost post={post} user={post.user} />
      <CommentsSection postId={post.id} comments={post.comments} />
    </div>
  );
}
