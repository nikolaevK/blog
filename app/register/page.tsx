import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { CreateNameCard } from "./components/create-name-card";

export default async function Register() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) redirect("/");

  return (
    <div className="flex items-center justify-center h-screen">
      <CreateNameCard />
    </div>
  );
}
