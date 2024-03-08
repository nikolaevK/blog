import PostCard from "@/components/ui/post-card";
import { Prisma, User } from "@prisma/client";

type PostWithLikeCount = Prisma.PostGetPayload<{
  include: {
    user: true;
  };
}>;

interface UsersPostsInterface {
  posts: PostWithLikeCount[];
  user: User;
}

export default function UsersPosts({ posts, user }: UsersPostsInterface) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      {posts.map((post) => (
        <PostCard post={post} user={user} key={post.id} />
      ))}
    </div>
  );
}
