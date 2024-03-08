"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUser } from "@/app/actions/updateUser";
import { toast } from "@/components/ui/use-toast";

interface ProfileSectionInterface {
  user: User;
}

const formSchema = z.object({
  description: z.string().max(1000, {
    message: "Description can be no longer than 1000 characters",
  }),
  linkedInLink: z.string(),
  githubLink: z.string(),
});

export type ProfileSectionType = z.infer<typeof formSchema>;

export default function ProfileSection({ user }: ProfileSectionInterface) {
  const [edit, setEdit] = useState(false);
  const form = useForm<ProfileSectionType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: user.description || "",
      linkedInLink: user.linkedInLink || "",
      githubLink: user.githubLink || "",
    },
    values: {
      description: user.description || "",
      linkedInLink: user.linkedInLink || "",
      githubLink: user.githubLink || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setEdit(false);
      await updateUser({ user: user.id, ...values });
      toast({ description: "Profile has been updated successfully" });
    } catch (error) {
      console.log(error);
      toast({ description: "Something went wrong" });
    }
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Profile</h1>
            <Button
              type="button"
              className="ml-auto"
              size="sm"
              onClick={() => setEdit(!edit)}
            >
              {edit ? "Cancel" : "Edit profile"}
            </Button>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row  items-center gap-4 mb-4">
              <Image
                alt="Avatar"
                className="rounded-full"
                height="100"
                src={user?.imageUrl}
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              />
              <div className="grid items-start gap-1.5">
                <h2 className="font-semibold text-xl md:text-2xl text-center md:text-start">
                  {user.userName}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Edit and manage your profile.
                </p>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[100px]"
                        id="about"
                        placeholder="Tell us about yourself..."
                        {...field}
                        disabled={!edit}
                      />
                    </FormControl>
                    <FormDescription>
                      Everyone will see this on your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex items-center justify-between w-full gap-4 my-6">
              <FormField
                control={form.control}
                name="linkedInLink"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>LinkedIn Link</FormLabel>
                    <FormControl>
                      <Input
                        id="social"
                        placeholder="Add your social media link..."
                        type="text"
                        disabled={!edit}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Everyone will see this on your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="githubLink"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Github Link</FormLabel>
                    <FormControl>
                      <Input
                        id="social"
                        placeholder="Add your social media link..."
                        type="text"
                        disabled={!edit}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Everyone will see this on your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={!edit}>
              Submit
            </Button>
          </div>
          <Separator />
        </form>
      </Form>
    </main>
  );
}
