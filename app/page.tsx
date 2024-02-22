import LandingPage from "@/components/ui/landing-page";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export default async function Home() {
  const { userId } = auth();

  const user = await prismadb.user.findFirst({
    where: {
      id: userId ? userId : undefined,
    },
  });

  if (userId && !user) redirect("/register");

  console.log(user);

  return (
    <>
      <LandingPage />
    </>
  );
}
