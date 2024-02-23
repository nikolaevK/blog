import LandingPage from "@/components/ui/landing-page";

import authenticate from "./actions/authenticate";

export default async function HomePage() {
  await authenticate();
  return (
    <>
      <LandingPage />
    </>
  );
}
