"use client";

import { updateLike } from "@/app/actions/updateLike";

import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";

interface LikesAndCommentsInterface {
  liked: boolean;
  countLikes: number;
  postId: string;
  slug: string;
  username: string;
  commentCount: number;
}

export default function LikesAndComments({
  liked,
  countLikes,
  commentCount,
  postId,
  slug,
  username,
}: LikesAndCommentsInterface) {
  const { userId } = useAuth();

  async function updateCount() {
    try {
      await updateLike({ postId, username, slug });
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
              className={`"w-4 h-4 ${liked ? "text-red-600" : "text-black"}`}
              fill={liked ? "red" : "white"}
            />
          </Link>
        )}
        {userId && (
          <HeartIcon
            onClick={updateCount}
            className={`"w-4 h-4 ${
              liked ? "text-red-600" : "text-black"
            } hover:cursor-pointer`}
            fill={liked ? "red" : "white"}
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
