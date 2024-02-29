import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Post, User } from "@prisma/client";

import ReactMarkdown from "react-markdown";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface BlogPostInterface {
  post: Post;
  user: User;
}

export default function BlogPost({ post, user }: BlogPostInterface) {
  return (
    <section className="p-6 ">
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
          <div className="flex items-center space-x-2 text-sm">
            <HeartIcon className="w-4 h-4 text-red-600" fill="red" />
            <span>12 Likes</span>
            <MessageCircleIcon className="w-4 h-4" />
            <span>5 Comments</span>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
