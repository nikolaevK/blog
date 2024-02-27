import PostCard from "@/components/ui/post-card";
import { Post, User } from "@prisma/client";

interface UsersPostsInterface {
  posts: Post[];
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
