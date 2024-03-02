import { auth } from "@clerk/nextjs";
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
  const { userId } = auth();
  const admin = userId === user.id;

  const wordCount = post?.content?.trim().split(/\s+/g).length;
  const minutesToRead = Number((wordCount / 100 + 1).toFixed(0));

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 mb-4">
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
                  {formatRelative(new Date(post.createdAt), new Date())}
                </span>
              </div>
            </div>
          </div>
          <Link href={`/${user.userName}/${post.slug}`}>
            <h2 className="md:text-2xl font-bold">{post.title}</h2>
          </Link>

          <div className="flex items-center space-x-2 text-sm">
            <HeartIcon className="w-4 h-4" />
            <span>12 Likes</span>
            <MessageCircleIcon className="w-4 h-4" />
            <span>5 Comments</span>
          </div>
        </div>
      </CardContent>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <CardFooter className="flex justify-between p-6">
          <div className="flex items-center space-x-2">
            <Link href={`/${user.userName}/${post.slug}`}>
              <Button>Read</Button>
            </Link>
            {admin && (
              <Link href={`/admin/edit-post/${post.slug}`}>
                <Button variant={"secondary"}>Edit</Button>
              </Link>
            )}
            {admin &&
              (post.published ? (
                <Button
                  variant={"outline"}
                  className="text-green-400 text-xs border-green-400 "
                >
                  Published
                </Button>
              ) : (
                <Button
                  variant={"outline"}
                  className="text-destructive text-xs border-destructive"
                >
                  Unpublished
                </Button>
              ))}
          </div>
          <div className="flex justify-center items-center text-muted-foreground gap-2">
            <p>{wordCount} words.</p>
            <p>
              {minutesToRead} {wordCount > 1 ? "minutes" : "minute"}
            </p>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
