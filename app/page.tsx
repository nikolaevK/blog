import LandingPage from "@/components/ui/landing-page";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import authenticate from "./actions/authenticate";

export default async function HomePage() {
  const { userId } = auth();
  const signedIn = await authenticate();

  if (userId && !signedIn) redirect("/register");
  return (
    <section className="mb-10 md:mb-0">
      <LandingPage />
    </section>
  );
}
