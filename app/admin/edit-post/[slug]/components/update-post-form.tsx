"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-uploader";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { Post } from "@prisma/client";
import { updatePost } from "@/app/actions/updatePost";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title needs to be at least 5 characters.",
  }),
  content: z
    .string()
    .min(10, {
      message: "Content should be at least 10 characters.",
    })
    .max(2460, {
      message: "Content is limited to 2500 words.",
    }),
  images: z.object({ url: z.string() }).array(),
  published: z.boolean(),
});

export type UpdatePostFormType = z.infer<typeof formSchema>;

export default function UpdatePostForm({ post }: { post: Post }) {
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<UpdatePostFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      images: [],
      published: post.published,
    },
    mode: "onChange",
  });

  async function submitPost(fields: UpdatePostFormType) {
    try {
      setLoading(true);
      await updatePost({
        ...fields,
        postId: post.id,
        username: post.username,
        postUserId: post.userId,
      });
      setLoading(false);
    } catch (error) {
      toast({
        description: "Something went wrong while updating post",
        variant: "destructive",
      });
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitPost)} className="h-full w-full">
        <FormField
          control={form.control}
          // This allows Input field to have current store's name
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <ImageUpload
                  urls={field.value.map((image) => image.url)}
                  disabled={loading}
                  onChange={(url) => field.onChange([...field.value, { url }])}
                  onRemove={(url) =>
                    field.onChange(
                      [...field.value].filter((current) => current.url !== url)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="text-lg">Title of article</FormLabel>
              <FormControl>
                <Input placeholder="write here" {...field} disabled={loading} />
              </FormControl>
              <FormDescription>
                This is going to be title of an article.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MarkDown  */}
        {preview && (
          <>
            <label className="text-lg font-medium">Content</label>
            <Card className="w-full h-full mt-2">
              <CardContent className="flex flex-col items-center gap-4 p-6">
                <div className="min-h-[278px] md:min-h-[516px] w-full">
                  <ReactMarkdown className="prose lg:prose-xl dark:prose-invert">
                    {form.watch("content")}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <div className={`${preview ? "hidden" : "flex flex-col"} h-full`}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="h-full mb-4">
                <FormLabel className="text-lg">Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share with your knowledge here..."
                    className="min-h-[250px] md:min-h-[500px]"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <div className="flex items-center space-y-1 leading-none">
                  <FormLabel className="text-muted-foreground">
                    Publish or save your post unpublished for further processing
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col mt-4 gap-2">
          <Button
            type="button"
            className="w-full"
            variant="secondary"
            onClick={() => setPreview((prev) => !prev)}
            disabled={loading}
          >
            {preview ? "Edit" : "Preview"}
          </Button>
          <Link href={"/admin"}>
            <Button
              type="button"
              variant={"secondary"}
              className="w-full"
              disabled={loading}
            >
              Cancel
            </Button>
          </Link>
          <Button className="w-full" disabled={loading}>
            Update
          </Button>
          {/* TODO: Write a function that deletes posts and comments together */}
          <Button
            type="button"
            variant={"destructive"}
            className="w-full"
            disabled={loading}
          >
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
}
