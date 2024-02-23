"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { z } from "zod";

const formSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "content is too short",
    })
    .max(20000, {
      message: "content is too long",
    }),
});
type Props = {};

export default function CreatePostForm({}: Props) {
  const [preview, setPreview] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "###dfgfdgdfg",
    },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        {preview && (
          <div className="p-8 my-4 bg-[#CAD2C5] border-2 border-[#354F52] rounded-md overflow-auto">
            <ReactMarkdown className="prose ">
              {form.watch("content")}
            </ReactMarkdown>
          </div>
        )}

        <div className={preview ? "hidden" : "flex flex-col"}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    // {...form.register("content")}
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
      <button onClick={() => setPreview((prev) => !prev)}>Preview</button>
    </Form>
  );
}
