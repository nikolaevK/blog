import authenticate from "@/app/actions/authenticate";
import MobileNavBar from "./mobile-nav-bar";
import NonMobileNavBar from "./non-mobile-nav-bar";

export async function NavBar() {
  const authorized = await authenticate();
  return (
    <>
      <NonMobileNavBar authorized={authorized} />
      {/* Mobile Navigation */}
      <MobileNavBar authorized={authorized} />
    </>
  );
}
