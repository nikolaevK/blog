import authenticate from "@/app/actions/authenticate";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Comment } from "@prisma/client";
import CommentCard from "./comment-card";

import { CommentDialog } from "./comment-dialog";

interface CommentsSectionInterface {
  postId: string;
  comments: Comment[];
}

export default async function CommentsSection({
  postId,
  comments,
}: CommentsSectionInterface) {
  const authenticated = await authenticate();
  return (
    <section className="px-6" id="comments">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <p className="md:text-lg font-semibold">
              Comments {`(${comments.length})`}
            </p>
            <CommentDialog authenticated={authenticated} postId={postId} />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="py-6">
          {comments.length === 0 && (
            <div className="flex justify-center items-center ">No Comments</div>
          )}
          <div
            className={`${
              comments.length === 0 ? "hidden" : "flex"
            } flex-col gap-2 justify-center items-center py-4`}
          >
            {comments.length > 0 &&
              comments.map((comment) => (
                <CommentCard comment={comment} key={comment.id} />
              ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
