import { format } from "date-fns";
import { Prisma, User } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import LikesAndComments from "./likes-and-comments";
import ReactMarkdown from "react-markdown";
import authenticate from "@/app/actions/authenticate";

type PostWithLikes = Prisma.PostGetPayload<{
  include: {
    likes: true;
    user: true;
    comments: true;
    _count: {
      select: {
        likes: true;
        comments: true;
      };
    };
  };
}>;

interface BlogPostInterface {
  post: PostWithLikes;
  user: User;
}

export default async function BlogPost({ post, user }: BlogPostInterface) {
  const { userId } = auth();

  // In order to determine if user in db still exists
  // user can have userId from auth but delete account with username in db
  const userStillExists = await authenticate();

  const liked = !!post.likes.find((like) => like.userId === userId);

  return (
    <section className="p-6">
      <Card>
        <CardHeader>
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:leading-[4.5rem]">
              {post.title}
            </h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Image
                  alt="Avatar"
                  className="rounded-full"
                  height={40}
                  src={user.imageUrl}
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width={40}
                />
                <div className="flex flex-col justify-center items-start">
                  <Link href={`/${user.userName}`}>
                    <div className="text-sm font-medium">@{user.userName}</div>
                  </Link>
                  <span className="text-sm text-muted-foreground">
                    Posted on {format(new Date(post.createdAt), "PPPP")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <ReactMarkdown className="prose lg:prose-xl dark:prose-invert">
            {post.content}
          </ReactMarkdown>
        </CardContent>
        <CardFooter>
          <LikesAndComments
            liked={liked}
            countLikes={post._count.likes}
            commentCount={post._count.comments}
            username={user.userName}
            slug={post.slug}
            postId={post.id}
            userStillExists={userStillExists}
          />
        </CardFooter>
      </Card>
    </section>
  );
}
