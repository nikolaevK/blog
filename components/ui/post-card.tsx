import { Post, User } from "@prisma/client";
import { formatRelative } from "date-fns";
import { CalendarIcon, HeartIcon, MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { Card, CardContent, CardFooter } from "./card";

interface PostCardInterface {
  post: Post;
  user: User;
}

export default function PostCard({ post, user }: PostCardInterface) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
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
                <div className="text-sm font-medium">@{user.userName}</div>

                {/* TODO: Create Datefns dates */}
                <span className="text-sm text-muted-foreground">
                  {formatRelative(new Date(post.createdAt), new Date())}
                </span>
              </div>
            </div>
          </div>
          <h2 className="md:text-2xl font-bold">{post.title}</h2>

          <div className="flex items-center space-x-2 text-sm">
            <HeartIcon className="w-4 h-4" />
            <span>12 Likes</span>
            <MessageCircleIcon className="w-4 h-4" />
            <span>5 Comments</span>
          </div>
        </div>
      </CardContent>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <CardFooter className="p-6">
          <div className="flex items-center space-x-2">
            <Link href={`/${user.userName}/${post.slug}`}>
              <Button size="lg">Read</Button>
            </Link>
            <Button variant={"secondary"} size="lg">
              Edit
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
