"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
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

const formSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "content is too short",
    })
    .max(20000, {
      message: "content is too long",
    }),
  images: z.object({ url: z.string() }).array(),
  published: z.boolean(),
});

type Props = {};

export default function CreatePostForm({}: Props) {
  const [preview, setPreview] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      images: [],
      published: false,
    },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="h-full w-full">
        <FormField
          control={form.control}
          // This allows Input field to have current store's name
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <ImageUpload
                  urls={field.value.map((image) => image.url)}
                  disabled={undefined}
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

        {/* MarkDown  */}
        {preview && (
          <>
            <label className="text-lg font-medium">Content</label>
            <Card className="w-full h-full mt-2">
              <CardContent className="flex flex-col items-center gap-4 p-6">
                <div className="min-h-[278px] md:min-h-[516px]">
                  <ReactMarkdown className="prose-sm md:prose lg:prose-xl dark:prose-invert ">
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
      </form>

      <div className="flex flex-col mt-4 gap-2">
        <Button
          className="w-full"
          variant="secondary"
          onClick={() => setPreview((prev) => !prev)}
        >
          {preview ? "Edit" : "Preview"}
        </Button>
        <Button className="w-full" onClick={() => setPreview((prev) => !prev)}>
          Post
        </Button>
      </div>
    </Form>
  );
}
