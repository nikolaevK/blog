"use client";

import { useAuth } from "@clerk/nextjs";
import { updateLike } from "@/app/actions/updateLike";
import Link from "next/link";

import { toast } from "@/components/ui/use-toast";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface LikesAndCommentsInterface {
  liked: boolean;
  countLikes: number;
  postId: string;
  slug: string;
  username: string;
  commentCount: number;
  userStillExists: boolean;
}

export default function LikesAndComments({
  liked,
  countLikes,
  commentCount,
  postId,
  slug,
  username,
  userStillExists,
}: LikesAndCommentsInterface) {
  const { userId } = useAuth();
  const router = useRouter();

  async function updateCount() {
    try {
      if (userStillExists) {
        await updateLike({ postId, username, slug });
      } else {
        router.push("/register");
      }
    } catch (error) {
      console.log(error);

      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="flex items-center">
        {!userId && (
          <Link href="/sign-in">
            <HeartIcon
              className={`"w-4 h-4 ${
                liked && userStillExists ? "text-red-600" : "text-black"
              }`}
              fill={liked && userStillExists ? "red" : "white"}
            />
          </Link>
        )}
        {userId && (
          <HeartIcon
            onClick={updateCount}
            className={`"w-4 h-4 ${
              liked && userStillExists ? "text-red-600" : "text-black"
            } hover:cursor-pointer`}
            fill={liked && userStillExists ? "red" : "white"}
          />
        )}

        <span>
          {countLikes} {countLikes === 1 ? "like" : "likes"}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <MessageCircleIcon className="w-4 h-4" />
        <span className="pl-0">
          {commentCount || 0} {commentCount === 1 ? "comment" : "comments"}
        </span>
      </div>
    </div>
  );
}
