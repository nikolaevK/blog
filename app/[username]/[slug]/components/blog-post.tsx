import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Post } from "@prisma/client";

import ReactMarkdown from "react-markdown";

interface BlogPostInterface {
  post: Post;
}

export default function BlogPost({ post }: BlogPostInterface) {
  return (
    <section className="p-6">
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:leading-[4.5rem]">
              {post.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Posted on {format(new Date(post.createdAt), "PPPP")}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <ReactMarkdown className="prose lg:prose-xl dark:prose-invert">
            {post.content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </section>
  );
}
