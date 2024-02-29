"use server";

import prismadb from "@/lib/prismadb";
import { auth, clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ProfileSectionType } from "../admin/components/profile-section";

interface UpdateUserInterface extends ProfileSectionType {
  user: string;
}

export async function updateUser({
  description,
  githubLink,
  linkedInLink,
  user,
}: UpdateUserInterface) {
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  if (userId !== user) throw new Error("Unauthorized");

  await prismadb.user.update({
    where: {
      id: user,
    },
    data: {
      linkedInLink: linkedInLink.length > 0 ? linkedInLink : null,
      description: description.length > 0 ? description : null,
      githubLink: githubLink.length > 0 ? githubLink : null,
    },
  });

  revalidatePath("/admin");
}
