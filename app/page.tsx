import LandingPage from "@/components/ui/landing-page";
import { redirect } from "next/navigation";
import authenticate from "./actions/authenticate";

export default async function HomePage() {
  const signedIn = await authenticate();

  if (!signedIn) redirect("/register");
  return (
    <>
      <LandingPage />
    </>
  );
}
