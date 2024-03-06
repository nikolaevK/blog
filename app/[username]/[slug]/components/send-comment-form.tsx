"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Smile } from "lucide-react";
import { createComment } from "@/app/actions/createComment";

const FormSchema = z.object({
  comment: z
    .string()

    .max(1500, {
      message: "Comment must not be longer than 1500 characters.",
    }),
});

type CommentType = z.infer<typeof FormSchema>;

export function SendCommentForm({
  postId,
  setOpen,
}: {
  postId: string;
  setOpen: (n: boolean) => void;
}) {
  const [openEmojiModal, setOpenEmojiModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<CommentType>({
    resolver: zodResolver(FormSchema),
  });

  const { theme } = useTheme();

  async function onSubmit(data: CommentType) {
    try {
      setLoading(true);
      await createComment({ postId, comment: data.comment });
      form.reset();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid items-start gap-4w-2/3 space-y-6 px-4"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="React to a post"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {openEmojiModal && (
          <Picker
            data={data}
            onEmojiSelect={(e: any) => {
              const currentComment = form.getValues("comment");
              form.setValue("comment", currentComment.concat(e.native));
            }}
            theme={theme}
          />
        )}
        <div className="flex justify-between gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="w-[20%] hidden md:flex"
            disabled={loading}
            onClick={() => setOpenEmojiModal((prev) => !prev)}
          >
            <Smile />
          </Button>
          <Button
            type="submit"
            className="w-full md:w-[80%]"
            disabled={loading}
          >
            Submit Comment
          </Button>
        </div>
      </form>
    </Form>
  );
}
