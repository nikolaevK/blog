import authenticate from "@/app/actions/authenticate";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { CommentDialog } from "./comment-dialog";

export default async function CommentsSection({ postId }: { postId: string }) {
  const authenticated = await authenticate();
  return (
    <section className="px-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <p className="md:text-lg font-semibold">Comments {`(${0})`}</p>
            <CommentDialog authenticated={authenticated} postId={postId} />
          </div>
        </CardHeader>
        <Separator />
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
}
