import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { CreateNameCard } from "./components/create-name-card";

export default async function Register() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  return (
    <div className="flex items-center justify-center h-screen">
      <CreateNameCard />
    </div>
  );
}
