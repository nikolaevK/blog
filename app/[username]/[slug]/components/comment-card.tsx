"use client";

import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Comment } from "@prisma/client";
import { formatRelative } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { DeleteIcon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { deleteComment } from "@/app/actions/deleteComment";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface CommentCardInterface {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardInterface) {
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const owner = comment.userId === userId;

  async function onDelete() {
    try {
      setLoading(true);
      await deleteComment({
        owner: comment.userId,
        commentId: comment.id,
        postId: comment.postId,
      });
      setLoading(false);
      toast({
        description: `${comment.comment} was successfully deleted.`,
      });
    } catch (error) {
      console.log(error);
      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  }
  return (
    <Card className="border w-full">
      <CardContent className="flex justify-between items-center p-4 md:p-6">
        <div className="flex gap-4 ">
          <div className="flex-shrink-0 flex items-center">
            <Image
              alt="Avatar"
              className="rounded-full"
              height="28"
              src={comment.photoUrl}
              style={{
                aspectRatio: "48/48",
                objectFit: "cover",
              }}
              width="28"
            />
          </div>
          <div className="grid gap-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <Link href={`/${comment.username}`}>
                <h4 className="text-base font-bold leading-none">
                  @{comment.username}
                </h4>
              </Link>
              <time className="text-sm text-gray-500" dateTime="2023-08-12">
                {formatRelative(new Date(comment.createdAt), new Date())}
              </time>
            </div>
            <p className="text-sm/relaxed">{comment.comment}</p>
          </div>
        </div>
        {owner && (
          <Button
            size={"sm"}
            className="p-2 md:p-4"
            onClick={onDelete}
            disabled={loading}
          >
            <DeleteIcon className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
