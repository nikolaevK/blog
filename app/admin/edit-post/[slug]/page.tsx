import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import UpdatePostForm from "./components/update-post-form";

export default async function EditPostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { userId } = auth();

  if (!userId) throw new Error("User is not logged in.");

  const post = await prismadb.post.findFirst({
    where: {
      userId,
      slug,
    },
  });

  if (!post) return <div>{`${slug} is not found.`}</div>;

  return (
    <div className="w-full h-full p-6 mb-12 md:mb-0">
      <UpdatePostForm post={post} />
    </div>
  );
}
